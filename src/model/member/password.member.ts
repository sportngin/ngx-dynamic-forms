import { ValidatorFn }          from '@angular/forms';

import { FieldType }  from '../../field.type';
import { SimpleMember }     from './simple.member';

export class PasswordMember extends SimpleMember {

    constructor(name: string, validators?: ValidatorFn | ValidatorFn[]) {
        super(FieldType.password, name, validators);
    }

    public canShowPassword: boolean;

    public allowShowPassword(allowShowPassword: boolean): PasswordMember {
        this.canShowPassword = allowShowPassword;
        return this;
    }

}