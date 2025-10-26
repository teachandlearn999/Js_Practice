class ProductsPage {
	constructor(page) {
		this.page = page;
	}

	locators = {
		getCategories: () => this.page.locator("[data-parent='#accordian']"),
	};

	async getCategoriesText() {
		return await this.locators.getCategories().allInnerTexts();
	}
}

export default ProductsPage;
