import { Component, Injector }  from '@angular/core';

import { FormMemberComponent }  from '../form.member.component';
import { MemberData }           from '../member.data';

@Component({
    selector: 'password-field',
    templateUrl: './password.field.component.pug',
    styleUrls: ['./checkbox.field.component.scss']
})
export class PasswordFieldComponent extends FormMemberComponent {

    public showPassword: boolean = false;

    constructor(
        elementData: MemberData,
        injector: Injector
    ) {
        super(elementData, injector);

        this.showPassword = elementData.showPassword;
    }

    toggleShowPassword() {
        this.showPassword = !this.showPassword;
    }
}