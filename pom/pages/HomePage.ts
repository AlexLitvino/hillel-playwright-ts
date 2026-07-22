import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage{

    //private readonly page: Page;
    private readonly signInButton: Locator = this.page.getByRole('button', { name: 'Sign In' });
    private readonly signUpButton: Locator = this.page.getByRole('button', { name: 'Sign up' });

    // constructor(page: Page){
    //     super(page);
    //     this.signInButton = this.page.getByRole('button', { name: 'Sign In' });
    // }

    async navigate() {
        await super.navigate("/");
    }

    async openSignInForm() {
        await this.signInButton.click();
    }

    async openSignUpForm() {
        await this.signUpButton.click();
    }

}