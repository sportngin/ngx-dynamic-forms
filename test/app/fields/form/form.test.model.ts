import { Validators } from '@angular/forms';

import { ButtonClass, ElementSiblingPosition, Model, PasswordValidator } from '@siplay/ng-dynamic-forms';

const buttonText = {
    default: 'Submit',
    invalid: 'Invalid',
    submitting: 'Please Wait...',
    submitted: 'Success!',
    error: 'Error'
};

export class FormTestModel extends Model {

    constructor() {
        super(Model.layout('.form-test',
            Model.layout('.inner',

                Model.layout('')
                    .addSiblingTip('Hey do this stuff thanks', null, ElementSiblingPosition.before),

                Model.stateMessage('email-check', 'There was an error checking your e-mail address.<br>Please try again.', '.alert.alert-danger'),

                Model.textMember('email', Validators.required, Validators.email, )
                    .addLabel('Email')
                    .addValidationMessage('required', 'Please enter your email address')
                    .addValidationMessage('email', 'Please enter a valid email address'),

                Model.passwordMember('password', Validators.required, PasswordValidator.validator([
                    { description: 'At least two letters', pattern: /[A-Za-z].*[A-Za-z]/ },
                    { description: 'At least two numbers', pattern: /\d.*\d/ },
                ]))
                    .addLabel('Password')
                    .addValidationMessage('required', 'Please enter a password.')
                    .addValidationMessage('validatePassword', 'At least two numbers and two letters'),

                Model.member('privacy', 'privacy')
                    .addSiblingTip('You must be 13 years or older to create an account.', '.alert.alert-warning'),

                Model.checkbox('marketingOptIn', () => true)
                    .addLabel('I want to receive newsletters and other offers from SI Play'),

                Model.submitButton(ButtonClass.success, buttonText, true),

                Model.button('submitError', ButtonClass.danger, buttonText, true)
                    .addData('error', true)
        )));
    }
}