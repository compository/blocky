export class CompositoryServiceMock {
  async getTemplateForDna(dnaHash) {
    return {
      dnaTemplate: {
        name: 'hi',
        zome_defs: [{ name: 'sample_zome', zome_def_hash: 'aha' }],
      },
      properties: null,
      uuid: '',
    };
  }
  async getZomeDef(zomeDefHash) {
    return {
      name: 'sample_zome',
      wasm_file: 'aha2',
      components_bundle_file: 'aha3',
      wasm_hash: 'aha4',
      entry_defs: [],
      required_properties: [],
      required_membrane_proof: false,
    };
  }
  async downloadFile(hash) {
    return new File([
      `
      export default function lenses(app, cellId) {
          return {
              standalone: [{
                  name: 'sample element',
                  render: (root) => {
                    root.innerHTML = 'haha'
                  }
              }]
          }
      }
      `,
    ], 'mock.txt');
  }
}
