import { test, expect } from "@playwright/test";
import Header from "../pageObjects/header";
import HomePage from "../pageObjects/homePage";
import ContactUsPage from "../pageObjects/contactUsPage";
import { contactUsData } from "../helpers/testData";

test.describe("contact us page tests", () => {
	test.beforeEach(async ({ page }) => {
		const homePage = new HomePage(page);
		await homePage.loadHomePage();
	});

	test("verify contacting website", async ({ page }) => {
		const header = new Header(page);
		const contactUsPage = new ContactUsPage(page);

		await header.clickContactUsLink();

		await contactUsPage.fillNameField(contactUsData.name);
		await contactUsPage.fillEmailField(contactUsData.email);
		await contactUsPage.fillMessageField(contactUsData.message);

		await contactUsPage.acceptConfirmationPopup();
		await contactUsPage.clickSubmitButton();

		const expectedElement = contactUsPage.locators.getSuccessSubmissionMessage();
		await expect(expectedElement).toBeVisible();
		await expect(expectedElement).toHaveText(
			contactUsData.successSubmissionMessage
		);
	});
});
