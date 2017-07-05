import { Validators } from '@angular/forms';

import { Model, PasswordValidator } from '@siplay/ng-dynamic-forms';
import { ButtonClass } from '../../../../src/model/member/button.member';

const buttonText = {
    default: 'Submit',
    invalid: 'Invalid',
    submitting: 'Please Wait...',
    submitted: 'Success!',
    error: 'Error'
};

export class FormTestModel extends Model {

    constructor() {
        super(
            Model.validationMessage('email', 'email', 'Please enter a valid email address.', '.alert.alert-danger'),
            Model.textMember('email', Validators.required, Validators.email)
                .addLabel('Email'),

            Model.passwordMember('password', Validators.required, PasswordValidator.validator([
                { description: 'At least two letters', pattern: /[A-Za-z].*[A-Za-z]/ },
                { description: 'At least two numbers', pattern: /\d.*\d/ },
            ]))
                .addLabel('Password')
                .addHelper('At least two letters and two numbers.'),

            Model.submitButton(ButtonClass.success, buttonText, true),

            Model.button('error', ButtonClass.danger, buttonText, true)
                .addData('error', true)
        );
    }
}