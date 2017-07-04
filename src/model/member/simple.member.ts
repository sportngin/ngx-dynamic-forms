import { FormControl, ValidatorFn } from '@angular/forms';

import { FormControlType }      from '../../form.control.type';
import { ModelElementType }     from '../model.element';
import { ModelMemberBase }      from './model.member';

export class SimpleMember extends ModelMemberBase<SimpleMember> {

    constructor(controlType: FormControlType | string, name: string, validators?: ValidatorFn | ValidatorFn[], defaultValue?: any, data?: { [key: string]: any }) {
        super(ModelElementType.control, controlType, name, validators, data);

        this.defaultValue = defaultValue;
    }

    public defaultValue: any;

    public createFormControl(): FormControl {
        return new FormControl(this.defaultValue, this.validators);
    }

}