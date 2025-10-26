import { test, expect } from "@playwright/test";
import Header from "../pageObjects/header";
import HomePage from "../pageObjects/homePage";
import ProductsPage from "../pageObjects/productsPage";
import { arrCategories } from "../helpers/testData";

test.describe("products page tests", () => {
	test.beforeEach(async ({ page }) => {
		const homePage = new HomePage(page);
		await homePage.loadHomePage();
	});

	test("verify product categories", async ({ page }) => {
		const header = new Header(page);
		const productsPage = new ProductsPage(page);

		await header.clickProductsLink();
		const data = await productsPage.getCategoriesText();

		expect(data).toEqual(arrCategories);
	});
});
