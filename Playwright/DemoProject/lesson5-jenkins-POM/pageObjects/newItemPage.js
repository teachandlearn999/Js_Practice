import Header from "./header";
import ConfigurePage from "./configurePage";

class NewItemPage extends Header {
	constructor(page) {
		super(page);
	}

	locPageName = () => this.page.locator("h1");
	locProjectNameField = () => this.page.locator("#name");
	locProjectTypes = () => this.page.locator("#items label");
	locFreestyleProject = () => this.page.locator(".hudson_model_FreeStyleProject");
	locOkButton = () => this.page.locator("#ok-button");

	async fillItemNameField(name) {
		await this.locProjectNameField().type(name);
		return this;
	}

	async clickFreestyleProject() {
		await this.locFreestyleProject().click();
		return this;
	}

	async clickOkButton() {
		await this.locOkButton().click();
		return new ConfigurePage(this.page);
	}
}

export default NewItemPage;
