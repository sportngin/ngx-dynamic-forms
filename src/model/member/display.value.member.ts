import { FormControl, ValidatorFn } from '@angular/forms';

import { DisplayValueFormControl }  from '../../display.value.form.control';
import { FormControlType }          from '../../form.control.type';

import { SimpleMember } from './simple.member';

export abstract class DisplayValueMember extends SimpleMember {

    protected abstract getDisplayValue(value: any): string;

    constructor(controlType: FormControlType | string, name: string, validators?: ValidatorFn | ValidatorFn[], defaultValue?: any, data?: { [key: string]: any }) {
        super(controlType, name, validators, defaultValue, data);
    }

    public createFormControl(): FormControl {
        return new DisplayValueFormControl(this.defaultValue, this.validators, null, (value: any) => this.getDisplayValue(value));
    }
}