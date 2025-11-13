import { test, expect } from "@playwright/test";
import { jenkinsData } from "./testData/jenkinsData";

test.describe("first test suite", () => {
	// -----------------
	// lesson 3 - установка jenkins, first test
	// -----------------

	//
	//
	//
	//
	// US_01.001 | New Item > Creatе a new item
	// -> Clicking the "OK" button should create the item

	// import { jenkinsData } from "./testData/jenkinsData";

	test("first jenkins test", async ({ page }) => {
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

		await page.locator("#side-panel a[href$='newJob']").click();
		await page.locator("#name").fill(jenkinsData.jobName);
		await page
			.locator(
				"#j-add-item-type-standalone-projects ul li[class*='FreeStyleProject']"
			)
			.click();
		await page.locator("#ok-button").click();

		await page.locator(".app-jenkins-logo").click();

		const job = await page
			.locator("#projectstatus .jenkins-table__link")
			.getAttribute("href");
		expect(job).toContain(jenkinsData.jobName);
	});

	//
	//
	// US_02.001 | Freestyle Project Configuration > Enable or Disable the Project
	// -> By clicking on Drop-down menu next to the Project name,
	//    the user can access to Configure

	test.skip("second jenkins test", async ({ page }) => {
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

		await page.locator("#side-panel a[href$='newJob']").click();
		await page.locator("#name").fill(jenkinsData.jobName);
		await page
			.locator(
				"#j-add-item-type-standalone-projects ul li[class*='FreeStyleProject']"
			)
			.click();
		await page.locator("#ok-button").click();

		await page.locator(".app-jenkins-logo").click();

		//

		const jobLink = page.locator(
			`#job_${jenkinsData.jobName} .jenkins-table__link`
		);
		await jobLink.hover();
		await jobLink.locator("button").hover();
		await jobLink.locator("button").click();

		const popup = page.locator("div[id^='tippy-'] .jenkins-dropdown");
		const popupLinks = await popup
			.locator(`[href*='${jenkinsData.jobName}']`)
			.allInnerTexts();
		expect(popupLinks).toContain(jenkinsData.jobPopupOptions.configure);
	});
});
