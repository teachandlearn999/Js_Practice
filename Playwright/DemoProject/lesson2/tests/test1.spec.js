import { test, expect } from "@playwright/test";
import { handleBrowserConsentPopup } from "./helpers/browserConsentPopupHandler";
import { pageHeadline } from "./helpers/data";

test.describe("lesson 2 tests", () => {
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

	// import { pageHeadline } from "./helpers/data";

	test("verify copy", async ({ page }) => {
		await page.goto("/");

		await expect(page.locator("h1").first()).toHaveText(pageHeadline);
	});
});
