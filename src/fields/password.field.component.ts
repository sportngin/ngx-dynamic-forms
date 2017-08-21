import { Component, Inject, Injector }  from '@angular/core';
import { FormControl }                  from '@angular/forms';

import { FIELD_DATA, FieldData }   from './element.data';
import { FieldBase }                        from './field.base';

@Component({
    selector: 'password-field',
    templateUrl: './password.field.component.pug',
    styleUrls: ['./checkbox.field.component.scss']
})
export class PasswordFieldComponent extends FieldBase<FormControl> {

    public showPassword: boolean = false;

    constructor(
        @Inject(FIELD_DATA) elementData: FieldData,
        injector: Injector
    ) {
        super(elementData, injector);

        this.showPassword = elementData.showPassword;
    }

    toggleShowPassword() {
        this.showPassword = !this.showPassword;
    }
}