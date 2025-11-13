import { test, expect } from "@playwright/test";
import Header from "../pageObjects/header";
import HomePage from "../pageObjects/homePage";

test.describe("homepage test", () => {
	test.beforeEach(async ({ page }) => {
		const homePage = new HomePage(page);
		await homePage.loadHomePage();
	});

	test("verify home page", async ({ page }) => {
		const header = new Header(page);

		const locator = header.locators.getHomePageLink();
		await expect(locator).toHaveCSS("color", "rgb(255, 165, 0)");
	});
});
