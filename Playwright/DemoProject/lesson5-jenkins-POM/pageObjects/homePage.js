import Header from "./header";
import NewItemPage from "./newItemPage";

class HomePage extends Header {
	/**
	 * @param {import('playwright').Page} page
	 */

	constructor(page) {
		super(page);
	}

	locNewItemLink = () => this.page.locator("a[href='/view/all/newJob']");
	locProjectLink = () => this.page.locator("#projectstatus .jenkins-table__link");
	locProjectName = () =>
		this.page.locator("#projectstatus .jenkins-table__link span");

	async clickNewItemLink() {
		await this.locNewItemLink().click();
		return new NewItemPage(this.page);
	}
}

export default HomePage;
