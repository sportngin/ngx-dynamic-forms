import { ValidatorFn } from '@angular/forms';

import { FormControlType }      from '../../form.control.type';
import { Model }                from '../model';
import { ModelElementTypes }    from '../model.element';
import { TemplatedMember }      from './templated.member';

export type ArrayItemPermission = boolean | ((value: any) => boolean);

export class ArrayMember extends TemplatedMember {

    constructor(name: string, template: Model, validators?: ValidatorFn | ValidatorFn[], data?: {}) {
        super(ModelElementTypes.array, FormControlType.list, name, template, validators, data);

        this.displaysValidation = false;
    }

    public canEditItem: ArrayItemPermission = true;
    public canAddItem: boolean = true;
    public canRemoveItem: ArrayItemPermission = true;

    public allowEditItem(allowEditItem: ArrayItemPermission): ArrayMember {
        this.canEditItem = allowEditItem;
        return this;
    }

    public allowAddItem(allowAddItem: boolean): ArrayMember {
        this.canAddItem = allowAddItem;
        return this;
    }

    public allowRemoveItem(allowRemoveItem: ArrayItemPermission): ArrayMember {
        this.canRemoveItem = allowRemoveItem;
        return this;
    }

}