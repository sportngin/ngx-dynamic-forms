import { ValidatorFn }          from '@angular/forms';

import { FormControlType }  from '../../form.control.type';
import { SimpleMember }     from './simple.member';

export class PasswordMember extends SimpleMember {

    constructor(name: string, validators?: ValidatorFn | ValidatorFn[]) {
        super(FormControlType.password, name, validators);
    }

    public canShowPassword: boolean;

    public allowShowPassword(allowShowPassword: boolean): PasswordMember {
        this.canShowPassword = allowShowPassword;
        return this;
    }

}