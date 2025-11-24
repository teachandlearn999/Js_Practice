import { expect } from "@playwright/test";
import { test } from "../../base.js";

test.describe("some other test", () => {
	test("test1", async ({ page }) => {
		page.locator("b");
	});

	test("test", async ({ page }) => {
		page.locator("a");
	});
});
