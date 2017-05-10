import { Component, Host, InjectionToken, Injector, Input } from '@angular/core';
import { FormControl }                                      from '@angular/forms';

import { FormComponentHost }    from '../form.component.host';
import { FieldBase }            from './field.base';

const TOKENS = {
    showPassword: new InjectionToken<boolean>('showPassword'),
};

@Component({
    selector: 'password-field',
    templateUrl: './password.field.pug.html'
})
export class PasswordFieldComponent extends FieldBase<FormControl> {

    @Input() public showPassword: boolean = false;

    constructor(
        injector: Injector,
        @Host() host: FormComponentHost
    ) {
        super(injector, host, TOKENS);
    }

    toggleShowPassword() {
        this.showPassword = !this.showPassword;
    }
}