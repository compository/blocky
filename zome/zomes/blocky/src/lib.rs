use hdk3::prelude::*;
use hc_utils::WrappedEntryHash;

mod utils;

pub fn err(reason: &str) -> HdkError {
    HdkError::Wasm(WasmError::Zome(String::from(reason)))
}

#[hdk_entry(id="block_board")]
#[derive(Clone)]
pub struct BlockLayout(String);

entry_defs![
    Path::entry_def(),
    BlockLayout::entry_def()
];

/** Calendar events **/

#[hdk_extern]
pub fn create_block_layout(
    board: BlockLayout,
) -> ExternResult<WrappedEntryHash> {
    create_entry(&board)?;

    let board_hash = hash_entry(&board)?;

    let path = Path::from("layouts");

    path.ensure()?;

    create_link(path.hash()?, board_hash.clone(), ())?;

    Ok(WrappedEntryHash(board_hash))
}

#[derive(Clone, Serialize, Deserialize, SerializedBytes)]
pub struct GetAllBoardsOutput(Vec<(WrappedEntryHash, BlockLayout)>);
#[hdk_extern]
pub fn get_all_block_layouts(_: ()) -> ExternResult<GetAllBoardsOutput> {
    let path = Path::from("layouts");

    let links = get_links(path.hash()?, None)?;

    let boards: Vec<(WrappedEntryHash, BlockLayout)> = links
        .into_inner()
        .iter()
        .map(|link| {
            let event: BlockLayout = utils::try_get_and_convert(link.target.clone())?;
            Ok((WrappedEntryHash(link.target.clone()), event))
        })
        .collect::<ExternResult<Vec<(WrappedEntryHash, BlockLayout)>>>()?;

    Ok(GetAllBoardsOutput(boards))
}
