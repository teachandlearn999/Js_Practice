class ContactUsPage {
	constructor(page) {
		this.page = page;
	}

	locators = {
		getInputFieldName: () => this.page.locator("input[data-qa='name']"),
		getInputFieldEmail: () => this.page.locator("input[data-qa='email']"),
		getInputFieldMessage: () => this.page.locator("#message"),
		getSumbitButton: () => this.page.locator("input[data-qa='submit-button']"),
		getSuccessSubmissionMessage: () =>
			this.page.locator(".contact-form .status"),
	};

	async fillNameField(name) {
		await this.locators.getInputFieldName().fill(name);
		return this;
	}

	async fillEmailField(email) {
		await this.locators.getInputFieldEmail().fill(email);
		return this;
	}

	async fillMessageField(message) {
		await this.locators.getInputFieldMessage().fill(message);
		return this;
	}

	async acceptConfirmationPopup() {
		this.page.on("dialog", async (dialog) => await dialog.accept());
	}

	async clickSubmitButton() {
		this.locators.getSumbitButton().click();
		return this;
	}
}

export default ContactUsPage;
