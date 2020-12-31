use hc_utils::WrappedEntryHash;
use hdk3::prelude::*;

mod utils;

pub fn err(reason: &str) -> HdkError {
    HdkError::Wasm(WasmError::Zome(String::from(reason)))
}

#[hdk_entry(id = "block_node")]
#[derive(Clone)]
pub struct BlockNode(String);

entry_defs![Path::entry_def(), BlockNode::entry_def()];

/** Calendar events **/

#[hdk_extern]
pub fn create_block_node(board: BlockNode) -> ExternResult<WrappedEntryHash> {
    create_entry(&board)?;

    let board_hash = hash_entry(&board)?;

    let path = Path::from("block_nodes");

    path.ensure()?;

    create_link(path.hash()?, board_hash.clone(), ())?;

    Ok(WrappedEntryHash(board_hash))
}

#[derive(Clone, Serialize, Deserialize, SerializedBytes)]
pub struct GetBlockNodesOutput(Vec<(WrappedEntryHash, BlockNode)>);
#[hdk_extern]
pub fn get_all_block_nodes(_: ()) -> ExternResult<GetBlockNodesOutput> {
    let path = Path::from("block_nodes");

    let links = get_links(path.hash()?, None)?;

    let boards: Vec<(WrappedEntryHash, BlockNode)> = links
        .into_inner()
        .iter()
        .map(|link| {
            let event: BlockNode = utils::try_get_and_convert(link.target.clone())?;
            Ok((WrappedEntryHash(link.target.clone()), event))
        })
        .collect::<ExternResult<Vec<(WrappedEntryHash, BlockNode)>>>()?;

    Ok(GetBlockNodesOutput(boards))
}

#[hdk_extern]
pub fn get_my_block_nodes(_: ()) -> ExternResult<GetBlockNodesOutput> {
    let entry_defs = match entry_defs(())? {
        EntryDefsCallbackResult::Defs(entry_defs) => Ok(entry_defs),
        _ => Err(crate::err("Could not find entry defs")),
    }?;

    let filter = ChainQueryFilter::default()
        .include_entries(true)
        .entry_type(EntryType::App(AppEntryType::new(
            EntryDefIndex::from(
                entry_defs
                    .entry_def_id_position(EntryDefId::App("block_node".into()))
                    .unwrap() as u8,
            ),
            zome_info()?.zome_id,
            EntryVisibility::Public,
        )));
    let entries = query(filter)?;

    let boards: Vec<(WrappedEntryHash, BlockNode)> = entries
        .0
        .into_iter()
        .map(|element| {
            let layout: BlockNode = utils::try_from_element(element.clone())?;

            Ok((
                WrappedEntryHash(element.header().entry_hash().unwrap().clone()),
                layout,
            ))
        })
        .collect::<ExternResult<Vec<(WrappedEntryHash, BlockNode)>>>()?;

    Ok(GetBlockNodesOutput(boards))
}
