import { Component, Inject, Injector }  from '@angular/core';
import { FormControl }                  from '@angular/forms';

import { FIELD_DATA_PROVIDER, FieldData }   from './element.data';
import { FieldBase }                        from './field.base';

@Component({
    selector: 'password-field',
    templateUrl: './password.field.pug',
    styleUrls: ['./checkbox.field.component.scss']
})
export class PasswordFieldComponent extends FieldBase<FormControl> {

    public showPassword: boolean = false;

    constructor(
        @Inject(FIELD_DATA_PROVIDER) elementData: FieldData,
        injector: Injector
    ) {
        super(elementData, injector);

        this.showPassword = elementData.showPassword;
    }

    toggleShowPassword() {
        this.showPassword = !this.showPassword;
    }
}