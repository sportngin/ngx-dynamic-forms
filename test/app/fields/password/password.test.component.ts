import { Component } from '@angular/core';

import { hostProvides } from '@siplay/ng-dynamic-forms';

import { FieldTestComponent }   from '../field.test.component';
import { PasswordTestModel }    from './password.test.model';

@Component({
    selector: 'password-test',
    templateUrl: '../field.test.pug',
    viewProviders: [
        hostProvides(PasswordTestComponent)
    ]
})
export class PasswordTestComponent extends FieldTestComponent {

    constructor() {
        super(new PasswordTestModel());
    }

    protected get fieldName() {
        return 'Password';
    }

    protected get modelSourcePath() {
        return 'test/app/fields/password/password.test.model.ts';
    }

}