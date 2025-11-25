import Layout from "./layout";
import NewItemPage from "./newItemPage";

class HomePage extends Layout {
	/**
	 * @param {import('playwright').Page} page
	 */

	constructor(page) {
		super(page);
	}

	getLocatorNewItemLink = () => this.page.locator("a[href='/view/all/newJob']");
	getLocatorItemLink = () =>
		this.page.locator("#projectstatus .jenkins-table__link");
	getLocatorItemName = () =>
		this.page.locator("#projectstatus .jenkins-table__link span");

	async clickNewItemLink() {
		await this.getLocatorNewItemLink().click();
		return new NewItemPage(this.page);
	}
}

export default HomePage;
