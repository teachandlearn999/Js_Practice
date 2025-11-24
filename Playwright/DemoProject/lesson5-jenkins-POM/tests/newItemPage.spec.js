import { expect } from "@playwright/test";
import { test } from "../../base.js";
import HomePage from "../pageObjects/homePage.js";
import { newItemPageData as pageData } from "../testData/newItemPageData.js";

test.describe("new item page tests", () => {
	// TC_01.001.09 | New Item > Creatе a new item> "New Item" be accessible (#142)

	test("TC_xxx | Verify new item page load", async ({ page }) => {
		const homePage = new HomePage(page);

		const newItemPage = await homePage.clickNewItemLink();
		await expect(newItemPage.getLocatorPageName()).toHaveText(
			pageData.PageTitle
		);
	});

	//

	test("TC_xxx | Verify project types", async ({ page }) => {
		const homePage = new HomePage(page);

		const newItemPage = await homePage.clickNewItemLink();

		const projectTypes = await newItemPage
			.getLocatorProjectTypes()
			.allInnerTexts();

		expect(projectTypes).toStrictEqual(pageData.ProjectTypes);
	});
});
