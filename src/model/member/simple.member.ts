import { FormControl, ValidatorFn } from '@angular/forms';

import { ElementType }      from '../../element.type';
import { FieldType }        from '../../field.type';
import { ModelMemberBase }  from './model.member';

export class SimpleMember extends ModelMemberBase<SimpleMember> {

    constructor(controlType: FieldType | string, name: string, validators?: ValidatorFn | ValidatorFn[], defaultValue?: any, data?: { [key: string]: any }) {
        super(ElementType.input, controlType, name, validators, data);

        this.defaultValue = defaultValue;
    }

    public defaultValue: any;

    public createFormControl(): FormControl {
        return new FormControl(this.defaultValue, this.validators);
    }

}