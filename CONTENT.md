Original lessons code: 
https://github.com/playwright-course-hillel/pw-course-playwright-repo


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


# 23 Page Object Model (POM) та структура фреймворку

Page object models
https://playwright.dev/docs/pom

Best Practices
https://playwright.dev/docs/best-practices


# 24 Використання Storage State та Projects
After login use context.storageState to save cookie in file.
After that use test.use({ storageState: '.states/auth.json' }); to load cookies.

```
test.use({ storageState: '.states/auth.json' });

test.beforeAll(() => {
  // Log in

  await context.storageState({path: "auth.json"});  // Save cookie
})
```

To run login before tests projects could be used.
Create script with successful login in setup/*.setup.ts.

In projects add project with setup:
```
  projects: [
    {
      name: 'setup',
      testMatch: '**/setup/**.setup.ts'
    },   
```

In target project add `dependencies: ['setup']`.
storageState could be added if setup should be run before any test in project.
```
  projects: [
    { name: 'setup', testMatch: '**/*.setup.ts' },           // setup-проєкт
    { name: 'tests',
      use: { ...devices['Desktop Chrome'], storageState: 'storageState.json' },
      dependencies: ['setup'],
    },
```

To run tests from extension, select both setup and e2e projects in extension.

To clear state before test run:
```
test.use({ storageState: { cookies: [], origins: [] } });
```

Authentication
https://playwright.dev/docs/auth

Projects
https://playwright.dev/docs/test-projects

Configuration (multiple environments)
https://playwright.dev/docs/test-configuration


# 25 Використання Fixtures (Фікстур) для оптимізації коду
browser -> context -> page

To create fixture import fixture test but rename it to base.
```
import { test as base, Page } from '@playwright/test';
```

Create type with list of fixtures:
```
type ScreenSizes = {
    smallScreen: Page;
    mediumScreen: Page;
    bigScreen: Page;

};
```
Type is created to allow intellisyntax when using fixture in tests.

Create fixtures body extending test fixture and re-assigning it.
Every fixture is separate function in extension:
```
export const test = base.extend<ScreenSizes>({
    smallScreen: async ({ page }, use) => {
        await page.setViewportSize({ width: 300, height: 300 });
        await use(page);
        console.log('Test with small screen is finished');
    },
    mediumScreen: async ({ page }, use) => {
        await page.setViewportSize({ width: 600, height: 600 });
        await use(page);
        console.log('Test with medium screen is finished');
    },
    bigScreen: async ({ page }, use) => {
        await page.setViewportSize({ width: 1000, height: 1000 });
        await use(page);
        console.log('Test with big screen is finished');
    },


});
export { expect } from '@playwright/test';  // not clear what this does?
```

Line `await use(page);` is passing fixture back, what is written before - is pre-condition, what is written after - is post-condition.

Fixtures
https://playwright.dev/docs/test-fixtures


# 26 Робота з CLI та командним рядком

```
npx playwright test // run all tests

npx playwright test tests/fixtures.spec.ts tests/signin.spec.ts  // run tests from specific files

npx playwright test signin  // run tests from file with partial match

npx playwright test my-spec.ts:42  // run test from file on specific line

npx playwright test -g "BMW"  // run tests with partial math of name

npx playwright test -headed  // run tests in headed mode (browser is visible)

npx playwright test --project="setup"  // run all tests of project

npx playwright test --ui  // run test in UI mode

npx playwright show-report  // show report of last run

npx playwright test --debug  // run tests in debug mode

npx playwright test --workers=1  // set max number of worker (CLI option will overwrite option from config file)

npx playwright test --config <CONFIG_FILE>
```

[Command line](https://playwright.dev/docs/test-cli)


# 27 Налагодження та Debugging у тестах
Debugging:
- Using --headed option with slowMo
```
  use: {
    launchOptions: {
      slowMo: 1000,
    }
```
- Using VS Code extension (set breakpoint, run using right-click and Debug test)
- Using --debug option of Playwright
- Placing page.pause() in test
- Using --ui option
- Using PWDEBUG=console before command to run test (Linux/mac), running $env:PWDEBUG="console" (Windows). It is used together with page.pause(). Then after opening browser, object playwright will be accessible in Console.
- Verbose API Logs: run tests using envvar DEBUG=pw:api 
- Traces in reports

Traces could be downloaded in zip file and then viewed in trace.playwright.dev

[Debugging Tests](https://playwright.dev/docs/debug)


# 28 Використання змінних середовища (Environment Variables)
Envvar in Windows command line:
```
set VARIABLE_NAME=value
```

Envvar in PowerShell:
```
$env:ENVIRONMENT_VARIABLE_NAME="value"
```

Envvar in Linux
```
export ENV_VAR=123456
```

To run command with set envvar
```
VARIABLE_NAME=value npx playwright test
```

Using in tests:
```
console.log(process.env.ENV_VAR);
```

Install dotenv library
```
npm install dotenv
```

In playwright.config.ts config file add:
```
require('dotenv').config();

    httpCredentials: {
      username: process.env.HTTP_USERNAME!,
      password: process.env.HTTP_PASSWORD!
    },
```

Create .env file:
```
HTTP_USERNAME = "guest"
HTTP_PASSWORD = "welcome2qauto"
```

For another environment another .env file could be created (for example .env.test).
Then in config file, path to this .env file should be specified:
```
require('dotenv').config({
  path: ".env.test"
});
```
Or it could be set this way (path required environment as envvar or use .env.local):
```
require('dotenv').config({
  path: `.env.${process.env.ENV} || local`;
});
```

Configuration
https://playwright.dev/docs/test-configuration

process.env
https://nodejs.org/api/process.html#processenv

dotenv
https://www.npmjs.com/package/dotenv
