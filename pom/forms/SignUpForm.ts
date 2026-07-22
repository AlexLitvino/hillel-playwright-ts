import { Locator } from "@playwright/test";
import { BaseForm } from "./BaseForm";

export class SignUpForm extends BaseForm {

    private readonly nameField = this.page.locator('#signupName');
    private readonly lastNameField = this.page.locator('#signupLastName');
    private readonly emailField = this.page.getByLabel("Email");
    private readonly passwordField = this.page.locator('//input[@name="password"]');
    private readonly reenterPasswordField = this.page.getByLabel("Re-enter password");
    public readonly missingFieldError =  this.page.getByRole('paragraph');


    async enterName(name: string){
        this.nameField.fill(name);
    }

    async triggerErrorOnField(fieldName: string) {
        let field: Locator;

        if (fieldName === 'name') {
            field = this.nameField;
        } else if (fieldName === 'lastName') {
            field = this.lastNameField;
        } else if (fieldName === 'email') {
            field = this.emailField;            
        } else if (fieldName === 'password') {
            field = this.passwordField;
        } else if (fieldName === 'reenterPassword') {
            field = this.reenterPasswordField;            
        } else {
            throw new Error('Wrong field name');
        }

        await field.focus();
        await field.blur();
    }

}