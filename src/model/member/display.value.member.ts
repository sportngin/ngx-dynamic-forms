import { FormControl, ValidatorFn } from '@angular/forms';

import { DisplayValueFormControl }  from './display.value.form.control';
import { MemberType }               from './member.type';

import { SimpleMember, SimpleMemberBase } from './simple.member';

export interface DisplayValueMember extends SimpleMember {

    getDisplayValue(value: any): string;

}

export abstract class DisplayValueMemberBase<TDisplayValueMember extends DisplayValueMemberBase<TDisplayValueMember>>
    extends SimpleMemberBase<TDisplayValueMember>
    implements DisplayValueMember {

    public abstract getDisplayValue(value: any): string;

    constructor(controlType: MemberType | string, name: string, validators?: ValidatorFn | ValidatorFn[], defaultValue?: any) {
        super(controlType, name, validators, defaultValue);
    }

    public createFormControl(): FormControl {
        return new DisplayValueFormControl(this.defaultValue, this.validators, null, (value: any) => this.getDisplayValue(value));
    }
}