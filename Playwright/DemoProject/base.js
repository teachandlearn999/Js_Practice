import { test as base } from "@playwright/test";
import HomePage from "./lesson5-jenkins-POM/pageObjects/homePage.js";
// import { cleanData } from "./helpers/cleanData.js";

export const test = base.extend({
	page: async ({ page, request }, use) => {
		//#region login (already done in jenkins)
		await page.goto(`http://localhost:8080/`);
		await page.locator("#j_username").fill("admin");
		await page.locator('input[name="j_password"]').fill("password");
		await page.locator('button[name="Submit"]').click();

		await page.waitForLoadState("networkidle");
		await Promise.race([
			page
				.waitForURL((url) => !url.includes("/login"), { timeout: 30000 })
				.catch(() => null),
			page
				.waitForSelector("#jenkins-head-icon", { timeout: 30000 })
				.catch(() => null),
		]);
		//#endregion

		// await cleanData(request);

		await page.goto("/");

		await use(page);
	},

	homePage: async ({ page }, use) => {
		const homePage = new HomePage(page);

		await use(homePage);
	},
});

export const expect = base.expect;
