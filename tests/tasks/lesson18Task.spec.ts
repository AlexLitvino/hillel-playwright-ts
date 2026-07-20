import test from "@playwright/test";

test.beforeEach(async ({page}) => {
    await page.goto("");
})

test("Sign In - CSS", async ({page}) => {
    await page.locator(".header_signin").highlight();
})

test("Sign In - XPath", async ({page}) => {
    await page.locator('//button[contains(@class, "header_signin")]').highlight();
})

test("Sign In - getByRole", async ({page}) => {
    await page.getByRole('button', { name: 'Sign in' }).highlight();
})

test("Header options", async ({page}) => {
    const header = page.locator('header');
    await header.getByText('Home').highlight();
    await header.getByText('About').highlight();
    await header.getByText('Contacts').highlight();
})
