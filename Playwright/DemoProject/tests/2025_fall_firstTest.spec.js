import { test, expect } from "@playwright/test";
import { pageHeadline } from "./helpers/firstTestData";

test.describe("first test suite", () => {
	//

	// ----- lesson 1

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

	// lesson 2

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

	test("native locators", async ({ page }) => {
		await page.goto("/");

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
});
