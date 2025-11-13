import { test, expect } from "@playwright/test";
import apiData from "./helpers/apiData.json";

const API_URL = "https://reqres.in/api/users";

test.describe("api tests", () => {
	// --- GET
	test("view list of users", async ({ request }) => {
		const response = await request.get(API_URL, {
			headers: {
				"x-api-key": "reqres-free-v1",
			},
		});

		// проверить что запрос пришел без ошибки
		expect(response.ok()).toBeTruthy();
		// expect(response.status()).toBe(200);

		// получить дату
		const result = await response.json();
		console.log(result);

		// сравнить дату
		const users = apiData.users;
		expect(result.data).toStrictEqual(users);
	});

	//
	//

	// --- POST
	test("post user", async ({ request }) => {
		const response = await request.post(API_URL, {
			headers: {
				"x-api-key": "reqres-free-v1",
			},
			data: {
				name: "John",
				job: "teacher",
			},
		});

		// проверить что запрос пришел без ошибки
		expect(response.status()).toBe(201);

		// получить дату
		const created = await response.json();
		console.log(created);
		expect(created.job).toBe("teacher");
	});

	//
	//

	// --- PATCH
	test("patch user", async ({ request }) => {
		const postResponse = await request.post(API_URL, {
			headers: {
				"x-api-key": "reqres-free-v1",
			},
			data: {
				name: "John",
				job: "teacher",
			},
		});

		const postCreated = await postResponse.json();
		console.log(postCreated);
		expect(postCreated.name).toBe("John");

		const patchResponse = await request.patch(API_URL + "/" + postCreated.id, {
			headers: {
				"x-api-key": "reqres-free-v1",
			},
			data: {
				name: "Jack",
			},
		});

		// получить дату
		const patchCreated = await patchResponse.json();
		console.log(patchCreated);
		expect(patchCreated.name).toBe("Jack");
	});
});
