import { ValidatorFn }          from '@angular/forms';

import { MemberType }   from './member.type';
import { SimpleMember } from './simple.member';

export class PasswordMember extends SimpleMember {

    constructor(name: string, validators?: ValidatorFn | ValidatorFn[]) {
        super(MemberType.password, name, validators);
    }

    public canShowPassword: boolean;

    public allowShowPassword(allowShowPassword: boolean): PasswordMember {
        this.canShowPassword = allowShowPassword;
        return this;
    }

}