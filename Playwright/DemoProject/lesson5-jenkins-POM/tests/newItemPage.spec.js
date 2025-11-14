import { expect } from "@playwright/test";
import { test } from "../../base.js";
import HomePage from "../pageObjects/homePage.js";
import { newItemPageData as pageData } from "../testData/newItemPageData.js";

test.describe("new item page tests", () => {
	test("TC_xxx | Verify new item page load", async ({ page }) => {
		const homePage = new HomePage(page);

		const newItemPage = await homePage.clickNewItemLink();
		await expect(newItemPage.locPageName()).toHaveText(pageData.PageTitle);
	});

	//

	test("TC_xxx | Verify project types", async ({ page }) => {
		const homePage = new HomePage(page);

		const newItemPage = await homePage.clickNewItemLink();

		const projectTypes = await newItemPage.locProjectTypes().allInnerTexts();

		expect(projectTypes).toStrictEqual(pageData.ProjectTypes);
	});
});
