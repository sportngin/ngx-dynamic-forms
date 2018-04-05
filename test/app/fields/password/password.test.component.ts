import { Component } from '@angular/core';

import { hostProviders } from '@siplay/ng-dynamic-forms';

import { FieldTestComponent }   from '../field.test.component';
import { PasswordTestModel }    from './password.test.model';

@Component({
    selector: 'password-test',
    templateUrl: '../field.test.component.pug',
    viewProviders: [
        hostProviders(PasswordTestComponent)
    ]
})
export class PasswordTestComponent extends FieldTestComponent {

    constructor() {
        super(new PasswordTestModel());
    }

    public get fieldName() {
        return 'Password';
    }

    public get modelSourcePath() {
        return 'test/app/fields/password/form.test.model.ts';
    }

}
