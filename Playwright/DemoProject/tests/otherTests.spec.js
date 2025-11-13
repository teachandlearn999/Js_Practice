import { test, expect } from "@playwright/test";

test.describe("first test suite", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/");
	});

	test("verify home page", async ({ page }) => {
		const locator = page.locator(".navbar-nav a[href='/']");

		await expect(locator).toBeVisible();
	});

	test("verify contact us form submission", async ({ page }) => {
		await page.getByText("Contact us").click();

		await page.locator("input[data-qa='name']").fill("my name");
		await page.locator("input[data-qa='email']").fill("myemail@email.com");
		await page.locator("#message").fill("here is my message");

		page.on("dialog", async (dialog) => await dialog.accept());
		await page.locator("input[data-qa='submit-button']").click();

		const expectedElement = page.locator(".contact-form .status");
		await expect(expectedElement).toBeVisible();
		await expect(expectedElement).toHaveText(
			"Success! Your details have been submitted successfully."
		);
	});

	test("verify categories on products page", async ({ page }) => {
		const result = ["WOMEN", "MEN", "KIDS"];

		await page.getByText("Products").click();

		const data = await page
			.locator("[data-parent='#accordian']")
			.allInnerTexts();
		expect(data).toEqual(result);
	});
});
