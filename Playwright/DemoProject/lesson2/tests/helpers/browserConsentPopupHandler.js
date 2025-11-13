export async function handleBrowserConsentPopup(page) {
	try {
		const buttonLocator = page.locator("button.fc-cta-consent");

		// Ищем кнопку, содержащую соглашение
		const consentButton = await buttonLocator.waitFor({ timeout: 5000 });

		await consentButton.click();
		// console.log("Cookie consent accepted.");

		// Ждём, пока popup исчезнет (проверяем опцию "state")
		//      Опция "state" позволяет дождаться достижения элементом определённого состояния в DOM
		//      "attached" - ждет пока элемент будет существовать в DOM (не гарантирует видимость элемента)
		//      "detached" - ждет пока элемент будет удален из DOM-а
		//      "visible" - (default) ждет пока элемент будет виден в DOM
		//      "hidden" - ждет пока элемент будет не виден в DOM
		await buttonLocator.waitFor({ state: "detached", timeout: 5000 });
	} catch (e) {
		console.log("No browser consent dialog found. Proceed with test.");
	}
}
