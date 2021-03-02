use std::collections::HashMap;

use hc_utils::WrappedEntryHash;
use hdk::prelude::*;

pub fn err(reason: &str) -> WasmError {
    WasmError::Guest(String::from(reason))
}

#[hdk_entry(id = "render_template")]
#[derive(Clone)]
pub struct RenderTemplate {
    css: String,
    js: String,
    html: String,
}

entry_defs![Path::entry_def(), RenderTemplate::entry_def()];

/** Calendar events **/

#[hdk_extern]
pub fn save_render_template(board: RenderTemplate) -> ExternResult<WrappedEntryHash> {
    create_entry(&board)?;

    let board_hash = hash_entry(&board)?;

    let path = all_templates_path();

    path.ensure()?;

    create_link(path.hash()?, board_hash.clone(), ())?;

    Ok(WrappedEntryHash(board_hash))
}

#[hdk_extern]
pub fn get_all_render_templates(_: ()) -> ExternResult<HashMap<WrappedEntryHash, RenderTemplate>> {
    let links = get_links(all_templates_path().hash()?, None)?;

    let mut templates: HashMap<WrappedEntryHash, RenderTemplate> = HashMap::new();

    for link in links.into_inner() {
        let maybe_element = get(link.target.clone(), GetOptions::default())?;

        if let Some(element) = maybe_element {
            let maybe_template: Option<RenderTemplate> = element.entry().to_app_option()?;

            if let Some(template) = maybe_template {
                templates.insert(WrappedEntryHash(link.target.clone()), template);
            }
        }
    }

    Ok(templates)
}

fn all_templates_path() -> Path {
    Path::from("all_render_templates")
}
