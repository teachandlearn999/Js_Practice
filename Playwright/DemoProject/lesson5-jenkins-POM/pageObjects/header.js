import HomePage from "./homePage";

class Header {
	constructor(page) {
		this.page = page;
	}

	locLogoLink = () => this.page.locator("#jenkins-head-icon");

	async clickLogoLink() {
		await this.locLogoLink().click();
		return new HomePage(this.page);
	}
}

export default Header;
