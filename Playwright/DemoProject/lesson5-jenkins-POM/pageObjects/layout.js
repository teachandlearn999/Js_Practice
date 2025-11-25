import HomePage from "./homePage";

class Layout {
	constructor(page) {
		this.page = page;
	}

	getLocatorLogoLink = () => this.page.locator("#jenkins-head-icon");

	async clickLogoLink() {
		await this.getLocatorLogoLink().click();
		return new HomePage(this.page);
	}
}

export default Layout;
