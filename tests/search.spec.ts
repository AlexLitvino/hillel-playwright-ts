import test from "@playwright/test";

test.beforeEach(async ({page}) => {
    await page.goto("");
})


// test("Site access", async ({page}) => {
//     await page.goto("");
// })

test("page.locator - XPath", async ({page}) => {
    const title = page.locator("//h1");
    const allButtons = page.locator("xpath=//button");
})

test("page.locator - CSS", async ({page}) => {
    const title = page.locator("h1");
    const allButtons = page.locator("css=button");
    const button = page.locator(".btn-primary");
    await button.click();
})

test("getByRole", async ({page}) => {
    page.getByRole("button");
})

test("getByText", async ({page}) => {
    page.getByText("Do more!");
})

test("getByPlaceholder", async ({page}) => {
    page.getByPlaceholder("");
})

test("getByAltText", async ({page}) => {
    page.getByAltText("Instructions");
})

test("getByLabel", async ({page}) => {
    page.getByLabel("Email");
})

test("getByTitle", async ({page}) => {
    page.getByTitle("");
})

test("getByTestId", async ({page}) => {
    page.getByTestId("");
})
