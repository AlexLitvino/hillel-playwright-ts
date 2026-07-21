import { test, expect } from '@playwright/test';

test.describe("Codegen tests", () => {

    test.beforeEach(async ({page}) => {
        await page.goto('https://guest:welcome2qauto@qauto.forstudy.space/');
        await page.getByRole('button', { name: 'Sign In' }).click();
    })

    test('Invalid credentials', async ({ page }) => {
        await page.getByRole('textbox', { name: 'Email' }).fill('unknown@email.com');
        await page.getByRole('textbox', { name: 'Password' }).fill('IncorrectPassword');
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page.getByText('Wrong email or password')).toBeVisible();
        await expect(page.getByRole('paragraph')).toContainText('Wrong email or password');
    });

    test('Empty email', async ({ page }) => {
        await page.getByRole('textbox', { name: 'Email' }).focus();
        await page.getByRole('textbox', { name: 'Email' }).blur()
        await expect(page.getByText('Email required')).toBeVisible();
        await expect(page.getByRole('paragraph')).toContainText('Email required');
    });

    test('Empty password', async ({ page }) => {
        await page.getByRole('textbox', { name: 'Password' }).focus();
        await page.getByRole('textbox', { name: 'Password' }).blur();
        await expect(page.getByText('Password required')).toBeVisible();
        await expect(page.getByRole('paragraph')).toContainText('Password required');
    });

    test('Incorrect email', async ({ page }) => {
        await page.getByRole('textbox', { name: 'Email' }).fill('incorrectEmail');
        await page.getByRole('textbox', { name: 'Email' }).blur();
        await expect(page.getByText('Email is incorrect')).toBeVisible();
        await expect(page.getByRole('paragraph')).toContainText('Email is incorrect');
    });

})
