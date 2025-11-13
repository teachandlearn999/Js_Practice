import { test, expect } from "@playwright/test";

test.describe("lesson 1 tests", () => {
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
});
