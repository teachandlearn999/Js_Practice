import { expect } from "@playwright/test";
import { test } from "../../base.js";
import HomePage from "../pageObjects/homePage.js";
import { homePageData } from "../testData/homePageData.js";

test.describe("homepage tests", () => {
	//
	// US_01.001 | New Item > Creatе a new item
	// -> Clicking the "OK" button should create the item
	test("TC_xxx | Verify creating new item", async ({ page }) => {
		const homePage = new HomePage(page);

		const newItemPage = await homePage.clickNewItemLink();
		await newItemPage.fillItemNameField(homePageData.projectName);
		await newItemPage.clickFreestyleProject();
		const configPage = await newItemPage.clickOkButton();

		await configPage.clickLogoLink();

		await expect(homePage.locProjectName()).toHaveText(homePageData.projectName);
	});
});
