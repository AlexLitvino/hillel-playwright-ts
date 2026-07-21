import { test, expect } from '@playwright/test';

test.describe("Registration", () => {
    test.beforeEach(async ({page}) => {
        await page.goto('https://guest:welcome2qauto@qauto.forstudy.space/');
        await page.getByRole('button', { name: 'Sign up' }).click();
    })

    test('Name is required', async ({ page }) => {
    await page.locator('#signupName').focus();
    await page.locator('#signupName').blur();
    await expect(page.getByRole('paragraph')).toContainText('Name required');
    });

    test('Last name is required', async ({ page }) => {
    await page.locator('#signupLastName').focus();
    await page.locator('#signupLastName').blur();
    await expect(page.getByRole('paragraph')).toContainText('Last name required');
    });

    test('Email is required', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Name Last name Email' }).focus();
    await page.getByRole('textbox', { name: 'Name Last name Email' }).blur();
    await expect(page.getByRole('paragraph')).toContainText('Email required');
    });

    test('Password is required', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Password', exact: true }).focus();
    await page.getByRole('textbox', { name: 'Password', exact: true }).blur();
    await expect(page.getByRole('paragraph')).toContainText('Password required');
    });

    test('Re-enter password is required', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Re-enter password' }).focus();
    await page.getByRole('textbox', { name: 'Re-enter password' }).blur();
    await expect(page.getByRole('paragraph')).toContainText('Re-enter password required');
    });

    test('Too short name', async ({ page }) => {
    await page.locator('#signupName').click();
    await page.locator('#signupName').fill('a');
    await page.locator('#signupName').blur();
    await expect(page.getByRole('paragraph')).toContainText('Name has to be from 2 to 20 characters long');
    });

    test('Name too long', async ({ page }) => {
    await page.locator('#signupName').click();
    await page.locator('#signupName').fill('123456789012345678901');
    await page.locator('#signupName').blur();
    await expect(page.locator('form')).toContainText('Name is invalid');
    await expect(page.locator('form')).toContainText('Name has to be from 2 to 20 characters long');
    });
})
