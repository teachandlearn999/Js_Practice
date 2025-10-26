class HomePage {
	/**
	 * @param {import('playwright').Page} page
	 */

	constructor(page) {
		this.page = page;
	}

	locators = {};

	async loadHomePage() {
		await this.page.goto("/");
	}
}

export default HomePage;
