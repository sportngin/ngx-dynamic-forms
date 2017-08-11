import { Component, Host, Inject, Injector } from '@angular/core';
import { FormControl } from '@angular/forms';

import { FormComponentHost }    from '../form.component.host';
import { FieldBase }            from './field.base';
import { ELEMENT_DATA_PROVIDER, ElementData } from './element.data';

@Component({
    selector: 'password-field',
    templateUrl: './password.field.pug',
    styleUrls: ['./checkbox.field.component.scss']
})
export class PasswordFieldComponent extends FieldBase<FormControl> {

    public showPassword: boolean = false;

    constructor(
        @Inject(ELEMENT_DATA_PROVIDER) elementData: ElementData,
        injector: Injector,
        @Host() host: FormComponentHost
    ) {
        super(elementData, injector, host);

        this.showPassword = elementData.showPassword;
    }

    toggleShowPassword() {
        this.showPassword = !this.showPassword;
    }
}