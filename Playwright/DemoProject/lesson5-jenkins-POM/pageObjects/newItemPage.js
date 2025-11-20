import Header from "./header";
import ConfigurePage from "./configurePage";

class NewItemPage extends Header {
	constructor(page) {
		super(page);
	}

	getLocatorPageName = () => this.page.locator("h1");
	getLocatorProjectNameField = () => this.page.locator("#name");
	getLocatorProjectTypes = () => this.page.locator("#items label");
	getLocatorFreestyleProject = () =>
		this.page.locator(".hudson_model_FreeStyleProject");
	getLocatorOkButton = () => this.page.locator("#ok-button");

	async fillItemNameField(name) {
		await this.getLocatorProjectNameField().type(name);
		return this;
	}

	async clickFreestyleProject() {
		await this.getLocatorFreestyleProject().click();
		return this;
	}

	async clickOkButton() {
		await this.getLocatorOkButton().click();
		return new ConfigurePage(this.page);
	}
}

export default NewItemPage;
