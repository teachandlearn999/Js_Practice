import { test, expect } from "@playwright/test";
import { pageHeadline } from "./helpers/firstTestData";

test.describe("first test suite", () => {
	//
	//
	//
	//
	//

	// ----- lesson 1
	// ----- первый тест
	test("verify page title", async ({ page }) => {
		await page.goto("/");

		const title = await page.title();

		console.log(title);

		expect(title).toEqual("Automation Exercise");
	});

	//
	//
	// =================================================
	//
	//

	// lesson 2

	test("soft assert", async ({ page }) => {
		await page.goto("/");

		const title = await page.title();
		expect.soft(title).toEqual("Automation Exercise 2");

		const image = page.locator(".logo img");
		expect.soft(image).toHaveAttribute("src", "/static/images/home/logo2.png");
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

	// ----- работа с массивами элементов
	test("verify array of elements", async ({ page }) => {
		await page.goto("/");

		const linksLocator = page.locator(".navbar-nav li");

		const allLinks = await linksLocator.all();
		console.log(allLinks);

		const allInnerTexts = await linksLocator.allInnerTexts();
		console.log(allInnerTexts);

		// --- trim out non-text in the results
		// const allTrueTexts = allInnerTexts.map((item) => {
		// 	return item.includes("Products") ? "Products" : item.trim();
		// });
		// console.log(allTrueTexts);

		const linkCount = await linksLocator.count();
		console.log(linkCount);

		// Метод filter()
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
			.locator("form[action='/signup']")
			.getByPlaceholder("Name")
			.fill("aaaa");
		await page
			.locator("form[action='/signup']")
			.getByPlaceholder("Email Address")
			.fill("aaaa@aaaa.aaaa");
		await page.locator("form[action='/signup'] button").click();

		const dropdown = page.locator("#months");

		// select value
		await dropdown.selectOption("October");

		// get selected value
		const matchValue = await dropdown.inputValue();
		console.log(matchValue);

		// get selected text
		const matchText = await dropdown.evaluate(
			(elem) => elem.options[elem.selectedIndex].text
		);
		console.log(matchText);

		//
		await dropdown.selectOption({ value: "9" });

		await dropdown.selectOption([{ index: 3 }]);
	});

	//
	//
	//
	//
	//

	// ----- loading a new page (link with _blank)

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

		expect(page.locator("#result-text")).toHaveText(
			"I am a new page in a new tab"
		);
		// expect(newPage.locator("#result-text")).toHaveText(
		// 	"I am a new page in a new tab"
		// );
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

		expect(page.locator("h1").first()).toHaveText(pageHeadline);
	});
});
