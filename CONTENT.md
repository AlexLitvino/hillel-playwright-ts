# 16 Використання DevTools та селекторів елементів у браузері

Selectors priorities:
- Special test attributes (data-testid, data-qa, data-test etc)
- ID
- Class
- Text
- Other attributes

Selectors:
- CSS
- XPath


DevTools F12
Add extension SelectorsHub to GoogleChome

## CSS
h1 - by tag
#aboutSection - by ID
[name="email"] - by attribute
[name*="em"] - include
[name^="em"] - starts with
[name$="em"] - ends with

form * - all indirect child to form
form > * - all direct child

## XPath
//h1
//div[@id="contactsSection"]
//div[contains(@id, "about")]
//button[text()="Sign up"]
//nav//*[@appscrollto="aboutSection"]
(//nav//*)[1]
//div[@class="section about" and @id="aboutSection"]

CSS Selectors Cheat Sheet
https://www.freecodecamp.org/news/css-selectors-cheat-sheet/

Xpath cheatsheet
https://devhints.io/xpath

Game for XPath
https://topswagcode.com/xpath/

Game for CSS
https://flukeout.github.io/


Task on page https://en.wikipedia.org/wiki/Wikimedia_Foundation
```
h1 span span
td.infobox-data.label li
img[srcset]

//h1/span/span
//table//tr//th[contains(text(), "Location")]/following-sibling::td//li
//img[@srcset]
```


# 17 Playwright Intro та встановлення
Cross-browser:
- Chromium
- WebKit
- FireFox

Cross-platform:
- Windows
- Linux
- macOS

Cross-language:
- TS
- JS
- Python
- .NET
- Java

Test mobile web

Auto-wait

Installation:
```
npm init playwright@latest
```

Choose the following options during installation
```
✔ Do you want to use TypeScript or JavaScript? · TypeScript
✔ Where to put your end-to-end tests? · tests
✔ Add a GitHub Actions workflow? (Y/n) · false
✔ Install Playwright browsers (can be done manually via 'npx playwright install')? (Y/n) · true
? Install Playwright operating system dependencies (requires sudo / root - can be done manually via 'sudo npx playwright install-deps')? (y/N) ‣ false
```

To install browsers manually:
```
npx playwright install
```
To install specific browser:
```
npx playwright install webkit
npx playwright install chromium
npx playwright install firefox
npx playwright install msedge
```

From installation:
Inside that directory, you can run several commands:

  npx playwright test
    Runs the end-to-end tests.

  npx playwright test --ui
    Starts the interactive UI mode.

  npx playwright test --project=chromium
    Runs the tests only on Desktop Chrome.

  npx playwright test example
    Runs the tests in a specific file.

  npx playwright test --debug
    Runs the tests in debug mode.

  npx playwright codegen
    Auto generate tests with Codegen.

We suggest that you begin by typing:

    npx playwright test

And check out the following files:
  - ./tests/example.spec.ts - Example end-to-end test
  - ./playwright.config.ts - Playwright Test configuration

Visit https://playwright.dev/docs/intro for more information.

Test file should follow naming: *.spec.ts

Test
```
test(title, callback)
```

```
import { test, expect } from '@playwright/test';

test('basic test', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  const name = await page.innerText('.navbar__title');
  expect(name).toBe('Playwright');
});
```

test.describe(title, callback) to specify test suite:
```
test.describe('two tests', () => {
	test('one', async ({ page }) => {
	// ...
	});

	test('two', async ({ page }) => {
	// ...
	});
});
```

To run tests:
```
npx playwright test
```

To run tests in headed mode:
```
npx playwright test --headed
```

Hooks:
- test.beforeEach
- test.afterEach
- test.beforeAll
- test.afterAll

Extension Playwright Test for VS Code

Run file with tests (example - part of file name):
```
npx playwright test example
```

Run test by name
```
npx playwright test -g "has title"
```

Run tests for specific project
```
npx playwright test --project=chromium
```

To skip tests:
```
test.describe.skip
test.skip
```

test.only - to run tests with "only" marker

To capture screenshots and video to report:
```
use: {
    trace: "on",
    screenshot: "on",
    video: "on"
}
```

Installing Playwright
https://playwright.dev/docs/intro#installing-playwright


# 18 Пошук елементів
To pass first authorization add to config:
```
    baseURL: "https://qauto.forstudy.space/",

    httpCredentials: {
      username: USERNAME,
      password: PASSWORD
    },
```
Specifying baseURL in config, no need to pass full path in goto.

page.locator doesn't require await, it is needed only when interacting with element.
```
page.locator(XPATH|CSS)
```

getByRole
```
page.getByRole(ROLE)
```
List of roles
https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles


- getByText
- getByPlaceholder
- getByAltText
- getByLabel - find input field related to label
- getByTitle
- getByTestId - by default looks for attribute data-testid. It could be changed in config use: testIdAttribute option.

Playwright is looking for element at the moment of interaction with that element.

Locators API
https://playwright.dev/docs/locators

Auto-waiting
https://playwright.dev/docs/actionability


# 19 Фільтрація елементів та масиви елементів
locator.filter():
- has - by child element (page.locator("//a").filter({has: page.locator('span.icon-telegram')}))
- hasNot
- hasText - by text
- hasNotText

Short form:
```
page.locator("//button", {hasText: "Sign"});
```

getByRole could be used with name:
```
page.getByRole('button', {name: "Sign up"})
```

Locator method could be used on other locator to search inside:
```
await page.locator("//nav").locator('//a').highlight();
```

Collections methods:
- count
- first
- last
- nth(index) - index starts from 0
- all - returns array of elements from locators

Filtering Locators
https://playwright.dev/docs/locators#filtering-locators


# 20 Виконання дій користувача (Actions) у тестах
Actions:
- on element https://playwright.dev/docs/api/class-locator#methods
- on page https://playwright.dev/docs/api/class-page#methods

Actions on element:
- click
- dblclick
- fill
- pressSequentially - don't clear text field
- press
- check
- uncheck
- isChecked
- selectOption - supports array for multiselect
- hover
- focus
- blur
- scrollIntoViewIfNeeded

Actions on page:
- goto
- reload
- url

Locator methods
https://playwright.dev/docs/api/class-locator#methods

Page methods
https://playwright.dev/docs/api/class-page#methods

Actions
https://playwright.dev/docs/input

File upload
https://playwright.dev/docs/input#upload-files


# 21 Перевірки результатів за допомогою Assertions
```
expect(entity).check();
expect(entity).not.check();
```

Assertions:
- Auto-retrying
- Non-retrying

Auto-retrying Assertions:
- toBeVisible
- toHaveText
- toContainText
- toHaveValue
- toHaveClass 
- toHaveCSS
- toBeChecked
- toHaveCount
- toHaveURL

Non-retrying Assertions:
- toBe
- toHaveLength
- toContain

Soft assertions
```
// Make a few checks that will not stop the test when failed...
await expect.soft(page.getByTestId('status')).toHaveText('Success');
await expect.soft(page.getByTestId('eta')).toHaveText('1 day');

// Avoid running further if there were soft assertion failures.
expect(test.info().errors).toHaveLength(0);
```


Assertions
https://playwright.dev/docs/test-assertions

Soft assertions
https://playwright.dev/docs/test-assertions#soft-assertions


# 22 Генерація тестів за допомогою CodeGen
To start codegen
```
npx playwright codegen <URL>
```

Or it could be run from VS Code extension: Record new button - it will record script to new file.
To check locators you could use Pick locator button from extension.

To clean up tests:
- move navigation to test.beforeEach
- move opening sign in form to test.beforeEach
- remove clicking on text fields before entering text
- change highlighting and unfocus fields with focus( and blur(methods))

Test generator
https://playwright.dev/docs/codegen
