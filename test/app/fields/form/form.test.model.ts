import { FormGroup, ValidationErrors, Validators } from '@angular/forms';

import { ButtonClass, Model, PasswordValidator } from '@siplay/ng-dynamic-forms';

const buttonText = {
    default: 'Submit',
    invalid: 'Invalid',
    submitting: 'Please Wait...',
    submitted: 'Success!',
    error: 'Error'
};

export class FormTestModel extends Model {

    constructor() {
        super(function checkedEmailValidator(form: FormGroup): null | ValidationErrors {
            if (form.controls['email']['fakeError']) {
                return {
                    email: {
                        fakeError: 'error'
                    }
                };
            }
            return null;
        },
            Model.layout('.form-test',
            Model.layout('.inner',
                Model.validationMessage('email', 'fakeError', 'There was an error checking your e-mail address.<br>Please try again.', '.alert.alert-danger'),
                Model.textMember('email', Validators.required, Validators.email, )
                    .addLabel('Email')
                    .addValidationMessage('required', 'Please enter your email address')
                    .addValidationMessage('email', 'Please enter a valid email address'),

                Model.passwordMember('password', Validators.required, PasswordValidator.validator([
                    { description: 'At least two letters', pattern: /[A-Za-z].*[A-Za-z]/ },
                    { description: 'At least two numbers', pattern: /\d.*\d/ },
                ]))
                    .addLabel('Password')
                    .addHelper('At least two letters and two numbers.')
                    .addValidationMessage('required', 'Please enter a password.'),

                Model.member('privacy', 'privacy')
                    .addHelper('You must be 13 years or older to create an account.', '.alert.alert-warning'),

                Model.checkbox('marketingOptIn', () => true)
                    .addLabel('I want to receive newsletters and other offers from SI Play'),

                Model.submitButton(ButtonClass.success, buttonText, true),

                Model.button('submitError', ButtonClass.danger, buttonText, true)
                    .addData('error', true)
        )));
    }
}