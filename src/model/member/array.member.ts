import { ValidatorFn } from '@angular/forms';

import { ElementType }      from '../../element.type';
import { FieldType }        from '../../field.type';
import { Model }            from '../model';
import { TemplatedMember }  from './templated.member';

export type ArrayItemPermission = boolean | ((value: any) => boolean);

export class ArrayMember extends TemplatedMember {

    constructor(name: string, template: Model, validators?: ValidatorFn | ValidatorFn[], data?: {}) {
        super(ElementType.input, FieldType.list, name, template, validators, data);

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