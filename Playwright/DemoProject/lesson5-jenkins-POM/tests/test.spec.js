import { expect } from "@playwright/test";
import { test } from "../../base.js";

test.describe("test", () => {
	test("test1", async ({ page }) => {
		page.locator("a");
	});
});
