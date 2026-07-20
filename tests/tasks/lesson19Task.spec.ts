import test from "@playwright/test";

test.beforeEach(async ({page}) => {
    await page.goto("");
})

test("Count buttons", async ({page}) => {
    let buttons = page.locator("//button");
    console.log(await buttons.count());
})

test("Sign In button", async ({page}) => {
    await page.getByRole("button").filter({hasText: "Sign In"}).highlight();
})