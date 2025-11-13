import { test, expect } from "@playwright/test";
import { handleBrowserConsentPopup } from "./helpers/browserConsentPopupHandler";
import { pageHeadline } from "./helpers/firstTestData";
import { jenkinsData } from "./testData/jenkinsData";

test.describe("first test suite", () => {
	//

	// -----------------
	// lesson 1
	// -----------------

	/*
    test - функция, используется для прогона тестов
    describe - свойство (property) функции test, группирует все тесты
    page - объект, отражает конкретную страницу. имеет множество методов
    expect - функция, используется для проверки. принимает локатор
    *toEqual - функция, что конкретно проверять. "matcher function", добовляется цепочкой к expect
    */

	// ----- первый тест
	test("verify page title", async ({ page }) => {
		await page.goto("/");

		const title = await page.title();

		console.log(title);

		expect(title).toEqual("Automation Exercise");
	});

	test("verify homepage", async ({ page }) => {
		await page.goto("/");

		const homepageLink = page.locator(".navbar-nav li:first-child a");
		await expect(homepageLink).toHaveCSS("color", "rgb(255, 165, 0)");
	});

	test("verify logo", async ({ page }) => {
		await page.goto("/");

		await expect(page.locator(".logo img")).toHaveAttribute(
			"src",
			"/static/images/home/logo.png"
		);

		// const imgUrl = await page.locator(".logo img").getAttribute("src");
		// expect(imgUrl).toBe("/static/images/home/logo.png");
	});

	//
	//
	// =================================================
	//
	//

	// -----------------
	// lesson 2
	// -----------------

	test("soft assert", async ({ page }) => {
		await page.goto("/");

		const title = await page.title();
		expect.soft(title).toEqual("Automation Exercise 2");

		const image = page.locator(".logo img");
		await expect
			.soft(image)
			.toHaveAttribute("src", "/static/images/home/logo2.png");
	});

	//
	//
	//
	//
	//

	/* --- inject html before testing
    
	test("inject html before testing", async ({ page }) => {
		page.setContent(`
        <html>
        <body>
            <label>
                <input type="checkbox"> Test 
            </label>
        </body>
        </html>
        `);
		const aa = page.getByRole("checkbox", { name: "Test" });
		await expect(aa).toBeVisible();
	});
    */

	//
	//
	//
	//

	test("native locators", async ({ page }) => {
		await page.goto("/");

		// // можно переписать предыдущие тесты:

		// const homeLink = page.locator(".navbar-nav li:first-child a");
		// await expect(homeLink).toHaveCSS("color", "rgb(255, 165, 0)");

		// const logo = page.locator(".logo img");
		// await expect(logo).toHaveAttribute("src", "/static/images/home/logo.png");

		//

		// const homeLink1 = page.getByText("Home");
		// await expect(homeLink1).toHaveCSS("color", "rgb(255, 165, 0)");

		// const logo1 = page.getByAltText("Website for automation practice");
		// await expect(logo1).toHaveAttribute("src", "/static/images/home/logo.png");
	});

	//
	//
	//
	//
	//

	// test.beforeEach(async ({ page }) => {
	// 	await page.goto("/");
	// });

	//
	//
	//
	//
	//

	test("first, last, nth methods", async ({ page }) => {
		await page.goto("/");

		const homeBullet = page.locator(".navbar-nav li:first-child");
		await expect(homeBullet).toHaveText("Home");

		// const homeBullet1 = page.locator(".navbar-nav li").first();
		// await expect(homeBullet1).toHaveText("Home");

		//
		//

		/* --- use playwright first(), then add rest of the locator
		const homeLink = page.locator(".navbar-nav li").first().locator("a");
		await expect(homeLink).toHaveCSS("color", "rgb(255, 165, 0)");
        */
	});

	//
	//
	//
	//
	//

	// ----- работа с массивами элементов
	test("verify array of elements", async ({ page }) => {
		await page.goto("/");

		const linksLocator = page.locator(".navbar-nav li");

		// -- all()

		const allLinksLocators = await linksLocator.all();
		console.log("all links: \n", allLinksLocators);

		for (let link of allLinksLocators) {
			const innerText = await link.innerText();
			if (innerText.includes("Test Cases")) {
				await link.click();
				break;
			}
		}

		expect(page).toHaveURL("https://www.automationexercise.com/test_cases");

		//
		// -- allInnerTexts()

		const allInnerTexts = await linksLocator.allInnerTexts();
		console.log("\nall inner texts: \n", allInnerTexts);

		// --- trim out non-text in the results
		// const allTrueTexts = allInnerTexts.map((item) => {
		// 	return item.includes("Products") ? "Products" : item.trim();
		// });
		// console.log(allTrueTexts);

		//
		// -- count()

		const linkCount = await linksLocator.count();
		console.log("\nlink count: ", linkCount);

		//
		//

		// --- Метод filter()
		await linksLocator.filter({ hasText: "Products" }).click();
	});

	//
	//
	//
	//
	//

	// ----- работа с меню и опциями
	test("verify select options", async ({ page }) => {
		await page.goto("/signup");

		await page
			.locator("form[action='/signup'] input[data-qa*='name']")
			.fill("aaaa");
		await page
			.locator("form[action='/signup'] input[data-qa*='email']")
			.fill("aaaa@aaaa.aaaa");
		await page.locator("form[action='/signup'] button").click();

		const dropdown = page.locator("#months");

		// select value
		await dropdown.selectOption("October");
		// await dropdown.selectOption({ value: "9" });
		// await dropdown.selectOption([{ index: 3 }]);

		// get selected value
		const matchValue = await dropdown.inputValue();
		console.log("selected value: ", matchValue);

		/* // alternative? get selected text
		const matchText = await dropdown.evaluate(
			(elem) => elem.options[elem.selectedIndex].text
		);
		console.log(matchText);
        */
	});

	//
	//
	//
	//
	//

	// ----- Работа с новыми страницами после клика на ссылку (link with _blank)

	test("loading a new page", async ({ page, context }) => {
		await page.goto("https://www.qa-practice.com/elements/new_tab/link");

		/*
        начать ожидание новой страницы ДО того как ссылка нажата:
		    до того как ссылка нажата, нам нужно настроить прослушиватель (listener),
		    который слушает/ждет пока ссылка будет нажата
        */
		// const pagePromise = context.waitForEvent("page");

		/* теперь нажимаем на ссылку */
		await page.locator("#new-page-link").click();

		/* ждем новую страницу */
		// const newPage = await pagePromise;

		/* ждем пока новая страница полностью загрузиться */
		// await newPage.waitForLoadState();

		await expect(page.locator("#result-text")).toHaveText(
			"I am a new page in a new tab"
		);
		// await expect(newPage.locator("#result-text")).toHaveText(
		// 	"I am a new page in a new tab"
		// );
	});

	//
	//
	//
	//
	// ---- Browser Consent Popups
	// ---- (handle Europe's consent popup for websites)

	// import { handleBrowserConsentPopup } from "./helpers/browserConsentPopupHandler";

	test("browser consent popup", async ({ page }) => {
		await page.goto("/");

		handleBrowserConsentPopup(page);

		// ... rest of the test
	});

	//
	//
	//
	//
	//

	// ----- дата файл

	// import { pageHeadline } from "./helpers/firstTestData";

	test("verify copy", async ({ page }) => {
		await page.goto("/");

		await expect(page.locator("h1").first()).toHaveText(pageHeadline);
	});

	//
	//
	//
	//
	//

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

	//
	//
	//
	//

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
