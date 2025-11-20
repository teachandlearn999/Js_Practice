import Header from "./header";
import NewItemPage from "./newItemPage";

class HomePage extends Header {
	/**
	 * @param {import('playwright').Page} page
	 */

	constructor(page) {
		super(page);
	}

	getLocatorNewItemLink = () => this.page.locator("a[href='/view/all/newJob']");
	getLocatorProjectLink = () =>
		this.page.locator("#projectstatus .jenkins-table__link");
	getLocatorProjectName = () =>
		this.page.locator("#projectstatus .jenkins-table__link span");

	async clickNewItemLink() {
		await this.getLocatorNewItemLink().click();
		return new NewItemPage(this.page);
	}
}

export default HomePage;
