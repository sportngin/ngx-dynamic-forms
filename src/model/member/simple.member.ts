import { FormControl, ValidatorFn } from '@angular/forms';

import { ElementType }      from '../element';
import { MemberType }       from '../member';
import { ModelMemberBase }  from './model.member.base';

export class SimpleMember extends ModelMemberBase<SimpleMember> {

    constructor(memberType: MemberType | string, name: string, validators?: ValidatorFn | ValidatorFn[], defaultValue?: any, data?: { [key: string]: any }) {
        super(ElementType.input, memberType, name, validators, data);

        this.defaultValue = defaultValue;
    }

    public defaultValue: any;

    public createFormControl(): FormControl {
        return new FormControl(this.defaultValue, this.validators);
    }

}