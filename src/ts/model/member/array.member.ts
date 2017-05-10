import { ValidatorFn } from '@angular/forms';

import { FormControlType }      from '../../form.control.type';
import { Model }                from '../model';
import { ModelElementTypes }    from '../model.element';
import { TemplatedMember }      from './templated.member';

export class ArrayMember extends TemplatedMember {

    constructor(name: string, template: Model, validators?: ValidatorFn | ValidatorFn[], data?: {}) {
        super(ModelElementTypes.array, FormControlType.list, name, template, validators, data);
    }

    public canEditItem: boolean = true;
    public canAddItem: boolean = true;
    public canRemoveItem: boolean = true;

    public allowEdit(allowEdit: boolean): ArrayMember {
        this.canEditItem = allowEdit;
        return this;
    }

    public allowAddItem(allowAddItem: boolean): ArrayMember {
        this.canAddItem = allowAddItem;
        return this;
    }

    public allowRemoveItem(allowRemoveItem: boolean): ArrayMember {
        this.canRemoveItem = allowRemoveItem;
        return this;
    }

}