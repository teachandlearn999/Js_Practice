import { expect } from "@playwright/test";
import { test } from "../../base.js";
import { homePageData } from "../testData/homePageData.js";

test.describe("homepage tests", () => {
	//
	// US_01.001 | New Item > Creatе a new item
	// -> Clicking the "OK" button should create the item
	test("TC_xxx | Verify creating new item", async ({ homePage }) => {
		const newItemPage = await homePage.clickNewItemLink();
		await newItemPage.fillItemNameField(homePageData.projectName);
		await newItemPage.clickFreestyleProject();

		const configPage = await newItemPage.clickOkButton();

		await configPage.clickLogoLink();

		await expect(homePage.getLocatorProjectName()).toHaveText(
			homePageData.projectName
		);

		// await homePage
		// 	.clickNewItemLink()
		// 	.then(async (o) => await o.fillItemNameField(homePageData.projectName))
		// 	.then(async (o) => await o.clickFreestyleProject())
		// 	.then(async (o) => await o.clickOkButton())
		// 	.then(async (o) => await o.clickLogoLink());

		// expect(homePage.getLocatorProjectName()).toHaveText(homePageData.projectName);
	});
});
