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


# 29 Репортинг і створення звітів про виконання тестів
Reporters:
- built-in
- 3rd-party
- cloud

Reporter could be specified as CLI option
```
npx playwright test --reporter=line
```

Or in config file:
```
import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: 'line',
});
```

To set several reporters in config (html reporter wouldn't never be automatically open, default value - on failure):
```
export default defineConfig({
  reporter: [['line'], ['html', open: "never"]],
});
```

## Built-in reporters
Built-in reporters:
- list
- line
- dot
- html
- blob
- json
- junit
- GitHub Actions annotations

To have more general steps in HTML report wrap steps in script with test.step:
```
        test.only('Add new car - Audi Q7', async ({ app }) => {
            test.step("Adding Audi Q7 with 999 miles", async () => {
                await app.addCarForm.addNewCar('Audi', 'Q7', '999');
            })
            test.step("Verifying that Audi Q7 with 999 miles is added", async () => {
                await app.garagePage.verifyCarIsAdded('Audi Q7', '555');
            })
        })
```

Or you could use specific decorators for POM.

## Allure
Install Allure library
```
npm install -D allure-playwright
```

Install Allure to your machine

Set allure reporter:
```
  reporter: "allure-playwright",
```

Generate report:
```
allure generate ./allure-results -o ./allure-report
```

Open report:
```
allure open ./allure-report
```

Other 3rd-party reporters:
- Mochawesome
- Monocart
- ReportPortal

## Cloud
TMS:
- Testmo
- Testomat.io
- TestRail
- Qase
- Azure Test Plans (Azure DevOps)
- Zephyr (Jira)

Reporters
https://playwright.dev/docs/test-reporters

allure-playwright
https://www.npmjs.com/package/allure-playwright

testomat.io
https://testomat.io/

Playwright Test Management & Reporting with Testmo
https://www.testmo.com/tools/playwright-test-management/

Integrating Qase with Playwright
https://www.qase.io/blog/integrating-qase-with-playwright/

TestRail Integrating with Playwright
https://support.testrail.com/hc/en-us/articles/9682231778324-Integrating-with-Playwright

Zephyr reporter for Playwright
https://www.npmjs.com/package/playwright-zephyr


# 30 Screenshot testing
## Verifying screenshots
To verify screenshot add (might be default file name)
```
await expect(app.page).toHaveScreenshot("add-car-no-milage-page.png");
```

It is possible to verify specific element on page:
```
await expect(app.page.locator('.car-item').first()).toHaveScreenshot("last-added-audi-q7.png");
```

By default screenshots are saved in test directory in directory named by test file. It could be changed in config file:
```
  snapshotDir: "./test-data/screenshots",
```

If test fails, difference will be saved in test-results directory.

If tests expectedly failed on screenshot, you could:
- update expected screenshot to actual screenshot, or
- re-run tests with --update-snapshots option

If we need to mask some dynamic elements on screen, they should be added to mask array:
```
await expect(app.page.locator('.car-item').first()).toHaveScreenshot("last-added-audi-q7.png", {mask: [app.page.locator('[name="miles"]')]});
```

It is possible to set the max difference between screenshots in pixels:
```
await expect(app.page.locator('.car-item').first()).toHaveScreenshot("last-added-audi-q7.png", {maxDiffPixels: 61});
```
Or it could be set in percent as maxDiffPixelsRatio.

To have the same screenshots better to set common view port size:
```
 page.setViewportSize(...)
```
Or in config
```
use: { viewport: { width, height } }
```

To make stable screenshots better wait for end of network communication or make sure that element is visible:
```
await page.waitForLoadState('networkidle')
await expect(locator).toBeVisible() 
```

## Creating screenshots
Screenshots could be made for page and for elements
```
            await app.page.screenshot({path: 'AddedCar.png', fullPage: true});
            await app.page.locator('.car-item').first().screenshot({path: "Audi Q7.png"});
```
By default for page screenshot will be taken only for visible part. Setting `fullPage: true` will make screenshot and for not-visible part of page.

Visual comparisons
https://playwright.dev/docs/test-snapshots

Screenshots
https://playwright.dev/docs/screenshots


# 31 Прості запити (GET, POST, PUT, DELETE) без авторизації
For sending requests without authorization `request` fixture is used:
```
test('Get all posts', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts');
    const posts = await response.json();
    expect(response.status()).toBe(200);
    expect(posts).toHaveLength(100);
})
```

It has methods for sending all REST API methods:
- get
- post
- put
- delete and others

APIResponse methods:
- response.status()
- response.statusText()
- response.ok()
- response.headers()
- response.json()
- response.text()

Fake API
https://jsonplaceholder.typicode.com/

API testing
https://playwright.dev/docs/api-testing

APIRequestContext
https://playwright.dev/docs/api/class-apirequestcontext

Що таке API: простими словами про складне
https://hostiq.ua/blog/ukr/what-is-api/

HTTP request methods
https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods


# 32 Запити із авторизацією
To remove notification in console from dotenv library, add to .env file
```
DOTENV_CONFIG_QUIET = true
```

Authorization methods:
- Basic Auth (HTTP Basic Authentication)
- Bearer Token (for example JWT)
- Cookie-based Authentication


If perform authorization request and adding new car in scope of one test, no need to pass sid to add new car request, because sid will be added to common context:
```
test("Add new car",  async ({request}) => {
    const authResponse = await request.post("/api/auth/signin", {data: {
        "email": testUser1.email,
        "password": testUser1.password,
        "remember": false
    }});
    expect(authResponse.status()).toBe(200);

    const addNewCarResponse = await request.post("/api/cars", {data: {
        "carBrandId": 3,
        "carModelId": 11,
        "mileage": 123
    }});
    console.log(addNewCarResponse);
    expect(addNewCarResponse.status()).toBe(201);
})
```

To make less request, one request with login could be made in beforeAll.
There we save sid.
And in tests it would be set in headers:
```
test.describe('Private requests', () => {
    let sid: string;

    test.beforeAll(async ({ request }) => {
        const responseAuth = await request.post('api/auth/signin', {
            data: {
                'email': testUser1.email,
                'password': testUser1.password,
            }
        });

        sid = responseAuth.headers()['set-cookie'].split(';')[0];

        expect(responseAuth.status()).toBe(200);
        expect(sid).toContain('sid=');
    })

...

        test('Add new car - Ford Fiesta', async ({ request }) => {
            const newCar = {
                'carBrandId': 3,
                'carModelId': 11,
                'mileage': 123
            }

            const response = await request.post('/api/cars/', {
                data: newCar,
                headers: {
                    'cookie': sid
                }
            });
```

To remove entities after tests for creation, collect all created IDs in describe-level variable and then in for-of loop remove them.

JSON.stringify(obj) - to print object as JSON.

qauto.forstudy.space swagger
https://qauto.forstudy.space/api-docs/

API testing
https://playwright.dev/docs/api-testing#authentication

Authorization header
https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Authorization

HTTP authentication
https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Authentication


# 33 Більш просунута структура API тестів
## Services (Controllers)
Logic of sending requests could be moved to separate files:
```
import { APIRequestContext, expect } from "@playwright/test";

export default class GarageService {

    private request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }


    async removeCar(sid: string, id: string, isPositive: boolean = true) {
        const response = await this.request.delete(`/api/cars/${id}`, {
            headers: {
                'cookie': sid
            }
        });

        if (isPositive) {
            return response;

        } else {
            const responseJson = await response.json();
            return responseJson.data;
        }
    }
}
```

## Data factories
To shorten tests, creatingf objects for tests could be moved from tests to separate function:
```
export function generateNewCar(carBrandId: number, carModelId: number, mileage: number) {
    return {
        carBrandId,
        carModelId,
        mileage
    }
}
```


# 34 Рефакторинг, pre- & post-conditions за допомогою API
Playwright runs tests in alphabetical order.

For setup files `fullyParallel: false` or `workers: 1` could be used.

test could be renamed to setup for setup files:
```
import { test as setup } from "@playwright/test";
```

For preconditions (as setup files) could be used:
- deleting existing data (users)
- creating clear users
- saving session id

Fixtures
https://playwright.dev/docs/test-fixtures

Global setup and teardown
https://playwright.dev/docs/test-global-setup-teardown

Best Practices
https://playwright.dev/docs/best-practices

Parallelism
https://playwright.dev/docs/test-parallel


# 35 Практика - 15 нових тестів, використання Faker, завантаження файлів та фабрики даних
To generate random realistic values use faker-js/faker library.

To upload file to input field setInputFiles method is used:
```
    async addPhoto(imagePath: string) {
        await this.photoField.setInputFiles(imagePath);
    }
```

@faker-js/faker
https://www.npmjs.com/package/@faker-js/faker


# 36 CI/CD + Docker basics
CI - regular change merge in common branch with automatic build and test
CD - automation of change delivery from test to production

CI/CD tools:
- GitHub Actions
- GitLab CI/CD
- Jenkins
- CircleCI / Travis CI

```
docker run -it -v .:/tests alpine sh
```

To update Playwright:
```
npm install @playwright/test@latest
```

To update browsers:
```
npx playwright install
```

To start container with mounted folder
```
docker run -it -v .:/playwright-tests mcr.microsoft.com/playwright:v1.62.0-noble sh
```

To run tests
```
npx playwright test --project=e2e
```

To build docker image
```
docker build -t playwright-tests .
```

To start container with tests
```
docker run playwright-tests
```

Docker Get started
https://docs.docker.com/get-started/

Playwright + Docker
https://playwright.dev/docs/docker


# 37 GitHub Actions - налаштування, запуск тестів та репорти
`npm ci` command uses package-lock.json file and doesn't change packages version.
`npm install` uses package.json and could use higher versions of packages.

To publish report to GitHub Pages, on https://github.com/AlexLitvino/hillel-playwright-ts/settings/pages Source set to GitHub Actions.
After successful deploy there will be link to GitHub Pages: https://alexlitvino.github.io/hillel-playwright-ts/

