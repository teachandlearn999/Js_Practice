import { expect } from "@playwright/test";
import { test } from "../../base.js";
import HomePage from "../pageObjects/homePage.js";
import { newItemPageData } from "../testData/newItemPageData.js";

test.describe("new item page tests", () => {
	// TC_01.001.09 | New Item > Creatе a new item> "New Item" be accessible (#142)

	test("TC_xxx | Verify new item page load", async ({ page }) => {
		const homePage = new HomePage(page);

		const newItemPage = await homePage.clickNewItemLink();
		await expect(newItemPage.getLocatorPageName()).toHaveText(
			newItemPageData.pageTitle
		);
	});

	//

	test("TC_xxx | Verify project types", async ({ page }) => {
		const homePage = new HomePage(page);

		const newItemPage = await homePage.clickNewItemLink();

		const projectTypes = await newItemPage.getLocatorItemTypes().allInnerTexts();

		expect(projectTypes).toStrictEqual(newItemPageData.projectTypes);
	});
});
