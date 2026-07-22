import { test, expect } from '@playwright/test';
import { HomePage } from '../pom/pages/HomePage';
import { SignInForm } from '../pom/forms/SignInForm';
import { invalidUser } from '../test-data/users';

test.describe("Sign In tests", () => {

    let homePage: HomePage;
    let signInForm: SignInForm;

    test.beforeEach(async ({page}) => {
        homePage = new HomePage(page);
        signInForm = new SignInForm(page);

        await homePage.navigate();
        await homePage.openSignInForm();
    })

    test('Invalid credentials', async () => {
        await signInForm.signInWithCredentials(invalidUser.email, invalidUser.password);
        await expect(signInForm.wrongCredentialsMessage).toBeVisible();
    });

    test('Empty email', async () => {
        await signInForm.triggerErrorOnField("email");
        await expect(signInForm.emptyEmailMessage).toBeVisible();
    });

    test('Empty password', async () => {
        await signInForm.triggerErrorOnField("password");
        await expect(signInForm.emptyPasswordMessage).toBeVisible();
    });

    test('Incorrect email', async ({ page }) => {
        await signInForm.enterEmail('incorrectEmail');
        await page.getByRole('textbox', { name: 'Email' }).blur();
        await expect(signInForm.wrongEmailMessage).toBeVisible();
    });

})
