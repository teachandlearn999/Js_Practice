import { test, expect } from "@playwright/test";
import { jenkinsData } from "./testData/jenkinsData";

test.describe("first test suite", () => {
	// -----------------
	// lesson 4
	// -----------------

	// ---- drag and drop

	test("drag and drop", async ({ page }) => {
		await page.goto("https://www.qa-practice.com/elements/dragndrop/boxes");

		const sourceEl = page.locator("#rect-draggable");
		const destinationEl = page.locator("#rect-droppable");

		await sourceEl.dragTo(destinationEl);

		// проверим, что source теперь внутри destination
		await expect(destinationEl).toContainText("Drag me");

		//
		//
		//

		/* 
            --- using mouse actions
		    Этот метод обеспечивает более детальный контроль и может быть полезен для
		    более сложных сценариев перетаскивания или когда dragTo() ведет себя не так,
		    как ожидалось.
        */

		// await page.goto("https://www.qa-practice.com/elements/dragndrop/boxes");

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

		const iframe = page.frameLocator(".embed-responsive-item");

		const buttonInsideIframe = iframe.locator(".btn-primary");

		await buttonInsideIframe.click();

		await expect(buttonInsideIframe).toBeVisible();
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
	//     (DO NOT SHOW)

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

	//
	//

	// --- working with hover menu on the project items

	test("hover menu on project items", async ({ page }) => {
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
		//

		// 1. Get locator of the job
		const jobLink = page.getByRole("link", {
			name: jenkinsData.jobName,
			exact: true,
		});

		// 2. Hover the job link (to make the button appear).
		await jobLink.hover();

		// 3. Get locator of the chevron button
		const chevronButton = jobLink.getByRole("button");

		// Ensure the button is visible before attempting to focus/click
		await chevronButton.waitFor({ state: "visible" });

		// 4. Click the button, but also try simulating a Tab/Enter key sequence
		// to ensure the element receives focus and triggers the dropdown logic.
		// NOTE: doing a normal hover/click would not work on CI
		await chevronButton.focus(); // Give the element focus
		await chevronButton.press("Enter"); // Simulate activation via keyboard

		// 5. Get locator of the popup
		const popupRoot = page.locator("div[id^='tippy-']");

		// Wait for the popup to display
		await popupRoot.waitFor({ state: "attached", timeout: 5000 });

		// 6. Get locator of the links inside the popup
		const popupLinks = popupRoot.locator(
			`.jenkins-dropdown [href*='${jenkinsData.jobName}']`
		);

		console.log("popupLinks: ", await popupLinks.allInnerTexts());

		expect(await popupLinks.allInnerTexts()).toContain(
			jenkinsData.jobPopupOptions.configure
		);
	});
});
