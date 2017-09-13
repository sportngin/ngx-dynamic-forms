import { FormControl, ValidatorFn } from '@angular/forms';

import { DisplayValueFormControl }  from './display.value.form.control';
import { MemberType }               from './member.type';

import { SimpleMember } from './simple.member';

export abstract class DisplayValueMember extends SimpleMember {

    protected abstract getDisplayValue(value: any): string;

    constructor(controlType: MemberType | string, name: string, validators?: ValidatorFn | ValidatorFn[], defaultValue?: any, data?: { [key: string]: any }) {
        super(controlType, name, validators, defaultValue, data);
    }

    public createFormControl(): FormControl {
        return new DisplayValueFormControl(this.defaultValue, this.validators, null, (value: any) => this.getDisplayValue(value));
    }
}