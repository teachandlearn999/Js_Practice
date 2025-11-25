import Layout from "./layout";
import ConfigureFreestyleProjectPage from "./configureFreestyleProjectPage";

class NewItemPage extends Layout {
	constructor(page) {
		super(page);
	}

	getLocatorPageName = () => this.page.locator("h1");
	getLocatorItemNameField = () => this.page.locator("#name");
	getLocatorItemTypes = () => this.page.locator("#items label");
	getLocatorFreestyleProject = () =>
		this.page.locator(".hudson_model_FreeStyleProject");
	getLocatorOkButton = () => this.page.locator("#ok-button");

	async fillItemNameField(name) {
		await this.getLocatorItemNameField().type(name);
		return this;
	}

	async clickFreestyleProject() {
		await this.getLocatorFreestyleProject().click();
		return this;
	}

	async clickOkButton() {
		await this.getLocatorOkButton().click();
		return new ConfigureFreestyleProjectPage(this.page);
	}
}

export default NewItemPage;
