import test, { expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
    await page.goto('');
})

test("Visibility of Sign In button", async ({page}) => {
    let signInButton = page.getByRole('button', {name: 'Sign In'});
    await expect(signInButton).toBeVisible();
})

test("Text of title", async ({page}) => {
    let title = page.locator("//h1");
    await expect(title).toHaveText('Do more!')
})

test("Number of images", async ({page}) => {
    let images = page.getByAltText('Instructions');
    await expect(images).toHaveCount(2);
})
