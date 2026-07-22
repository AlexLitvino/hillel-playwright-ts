import { test, expect } from '@playwright/test';
import { HomePage } from '../../pom/pages/HomePage';
import { SignUpForm } from '../../pom/forms/SignUpForm';

test.describe("Registration", () => {

    let homePage: HomePage;
    let signUpForm: SignUpForm;

    test.beforeEach(async ({page}) => {
        homePage = new HomePage(page);
        signUpForm = new SignUpForm(page);

        await homePage.navigate();
        await homePage.openSignUpForm();
    })

    test('Name is required', async ({ page }) => {
        await signUpForm.triggerErrorOnField("name");
        await expect(signUpForm.missingFieldError).toContainText('Name required');
    });

    test('Last name is required', async ({ page }) => {
        await signUpForm.triggerErrorOnField("lastName");
        await expect(signUpForm.missingFieldError).toContainText('Last name required');
    });

    test('Email is required', async ({ page }) => {
        await signUpForm.triggerErrorOnField("email");
        await expect(signUpForm.missingFieldError).toContainText('Email required');
    });

    test('Password is required', async ({ page }) => {
        await signUpForm.triggerErrorOnField("password");
        await expect(signUpForm.missingFieldError).toContainText('Password required');
    });

    test('Re-enter password is required', async ({ page }) => {
    signUpForm.triggerErrorOnField("reenterPassword");
    await expect(signUpForm.missingFieldError).toContainText('Re-enter password required');
    });

    test('Too short name', async ({ page }) => {
    signUpForm.enterName('a')
    await page.locator('#signupName').blur();
    await expect(signUpForm.missingFieldError).toContainText('Name has to be from 2 to 20 characters long');
    });

    test('Name too long', async ({ page }) => {
    signUpForm.enterName('123456789012345678901');
    await page.locator('#signupName').blur();
    await expect(page.locator('form')).toContainText('Name is invalid');
    await expect(page.locator('form')).toContainText('Name has to be from 2 to 20 characters long');
    });
})
