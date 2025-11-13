import { test, expect } from "@playwright/test";

test.describe("first test suite", () => {
	// -----------------
	// lesson 4
	// -----------------

	// ---- drag and drop

	test("drag and drop", async ({ page }) => {
		await page.goto("https://www.qa-practice.com/elements/dragndrop/boxes");

		// const sourceEl = page.locator("#rect-draggable");
		// const destinationEl = page.locator("#rect-droppable");

		// await sourceEl.dragTo(destinationEl);

		// // проверим, что source теперь внутри destination
		// await expect(destinationEl).toContainText("Drag me");

		//
		//
		//

		// --- using mouse actions
		// Этот метод обеспечивает более детальный контроль и может быть полезен для
		// более сложных сценариев перетаскивания или когда dragTo() ведет себя не так, как ожидалось.

		// const sourceEl = page.locator("#rect-draggable");
		// const destinationEl = page.locator("#rect-droppable");

		// await sourceEl.hover(); // hover over the source element
		// await page.mouse.down(); // press left mouse button
		// await destinationEl.hover(); // hover over the destination element
		// await page.mouse.up(); // release the left mouse button

		// await expect(destinationEl).toContainText("Drag me");
	});

	//
	//
	//
	//
	//

	// ---- working with iframes

	test("iframes", async ({ page }) => {
		await page.goto("https://www.qa-practice.com/elements/iframe/iframe_page");

		// const iframe = page.frameLocator(".embed-responsive-item");

		// const buttonInsideIframe = iframe.locator(".btn-primary");

		// await buttonInsideIframe.click();

		// await expect(buttonInsideIframe).toBeVisible();
	});

	//
	//

	// --- working with alert, confirm, prompt

	test("alert", async ({ page }) => {
		await page.goto("https://www.qa-practice.com/elements/alert/alert");

		page.on("dialog", async (dialog) => {
			// Assert the message contained in the dialog
			expect(dialog.message()).toContain("I am an alert!");

			// Accept or dismiss the dialog (e.g., click OK)
			await dialog.accept();
		});

		await page.locator(".a-button").click();
	});

	//
	//

	// --- working with modal

	test("modal", async ({ page }) => {
		await page.goto("https://www.qa-practice.com/elements/popup/modal");

		await page.getByRole("button", { name: "Launch Pop-Up" }).click();

		const modal = page.locator("#exampleModal");

		await expect(modal.locator("#exampleModalLabel")).toHaveText(
			"I am a Pop-Up"
		);
	});

	//
	//

	// --- working with auto-opening modal

	test.skip("auto-opening modal", async ({ page }) => {
		// Navigate to your page
		await page.goto("https://example.com");

		// Register the locator handler BEFORE the action that might trigger the modal
		await page.addLocatorHandler(
			page.locator("your-modal-button-selector"), // Locator for the button inside the modal
			async (button) => {
				console.log("Modal appeared, clicking the button...");
				await button.click();
			}
		);

		// Continue with your main test actions.
		// Playwright will automatically run the handler if the modal appears.
		await page.locator("your-triggering-element-selector").click();
		// ... more test steps
	});
});
