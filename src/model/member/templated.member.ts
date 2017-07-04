import { ValidatorFn } from '@angular/forms';

import { FormControlType }  from '../../form.control.type';
import { Model }            from '../model';
import { ModelElementType } from '../model.element';
import { ModelMemberBase }  from './model.member';

export class TemplatedMember extends ModelMemberBase<TemplatedMember> {

    constructor(elementType: ModelElementType, controlType: FormControlType | string, name: string, template: Model, validators?: ValidatorFn | ValidatorFn[], data?: {}) {
        super(elementType, controlType, name, validators, data);

        this.template = template;
    }

    public template: Model;

}