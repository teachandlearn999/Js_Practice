import ContactUsPage from "./contactUsPage";
import ProductsPage from "./productsPage";

class Header {
	constructor(page) {
		this.page = page;
	}

	locators = {
		getHomePageLink: () => this.page.locator(".navbar-nav a[href='/']"),
		getContactUsLink: () => this.page.getByText("Contact us"),
		getProductsLink: () => this.page.getByText("Products"),
	};

	async clickContactUsLink() {
		await this.locators.getContactUsLink().click();
		return new ContactUsPage(this.page);
	}

	async clickProductsLink() {
		await this.locators.getProductsLink().click();
		return new ProductsPage(this.page);
	}
}

export default Header;
