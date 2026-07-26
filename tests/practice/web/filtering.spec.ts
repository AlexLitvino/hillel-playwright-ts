import test from "@playwright/test";

test.beforeEach(async ({page}) => {
    await page.goto("");
})

test(".filter - hasText", async ({page}) => {
    page.locator("//button").filter({hasText: "Sign up"});
    page.getByRole('button').filter({hasText: "Sign"});
    page.locator("//button", {hasText: "Sign"});
    page.getByRole('button', {name: "Sign up"})
})

test(".filter - hasNotText", async ({page}) => {
    page.locator("//button").filter({hasNotText: "Sign"});
})

test(".filter - has", async ({page}) => {
    await page.locator("//a").filter({has: page.locator('span.icon-telegram')}).highlight();
})

test(".filter - hasNot", async ({page}) => {
    await page.locator("//a").filter({hasNot: page.locator('span.icon-telegram')}).highlight();
})

test("locator in locator", async ({page}) => {
    await page.locator("//nav").locator('//a').highlight();
})