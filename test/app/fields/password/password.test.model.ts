import { Validators } from '@angular/forms';

import { Model, PasswordValidator } from '@siplay/ng-dynamic-forms';

export class PasswordTestModel extends Model {

    constructor() {
        super(
            Model.passwordMember('simplePassword', Validators.required)
                .addLabel('Simple Password')
                .addValidationMessage('required', 'Please enter a password.', { cssClasses: ['.alert.alert-danger'] }),

            Model.passwordMember('strengthValidatedPassword', Validators.required, PasswordValidator.validator([
                { description: 'At least two letters', pattern: /[A-Za-z].*[A-Za-z]/ },
                { description: 'At least two numbers', pattern: /\d.*\d/ },
            ]))
                .addLabel('Validated Password')
                .addSiblingTip('At least two letters and two numbers.')
        );
    }
}