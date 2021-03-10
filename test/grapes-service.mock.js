export class GrapesServiceMock {
  constructor() {
    this.templates = [];
  }

  saveRenderTemplate(renderTemplate) {
    this.templates.push(renderTemplate);
  }

  async getAllRenderTemplates() {
    return this.templates;
  }
}
