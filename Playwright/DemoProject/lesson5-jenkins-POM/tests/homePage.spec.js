import { expect } from "@playwright/test";
import { test } from "../../base.js";
import HomePage from "../pageObjects/homePage.js";
import { globalData } from "../testData/globalData.js";

test.describe("homepage tests", () => {
	//
	// US_01.001 | New Item > Creatе a new item
	// -> Clicking the "OK" button should create the item
	test("TC_xxx | Verify creating new item", async ({ page }) => {
		const homePage = new HomePage(page);

		const newItemPage = await homePage.clickNewItemLink();
		await newItemPage.fillItemNameField(globalData.projectName);
		await newItemPage.clickFreestyleProject();

		const configFreestyleProjectPage = await newItemPage.clickOkButton();

		await configFreestyleProjectPage.clickLogoLink();

		await expect(homePage.getLocatorItemName()).toHaveText(
			globalData.projectName
		);

		// await homePage
		// 	.clickNewItemLink()
		// 	.then(async (o) => await o.fillItemNameField(globalData.projectName))
		// 	.then(async (o) => await o.clickFreestyleProject())
		// 	.then(async (o) => await o.clickOkButton())
		// 	.then(async (o) => await o.clickLogoLink());

		// expect(homePage.getLocatorItemName()).toHaveText(globalData.projectName);
	});
});
