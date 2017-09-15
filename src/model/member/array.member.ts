import { ValidatorFn } from '@angular/forms';

import { ElementType }              from '../element/element.type';
import { Model }                    from '../model';
import { MemberType }               from './member.type';
import { TemplatedMember }          from './templated.member';
import { ValidationDisplayMode }    from './validation.display.mode';

export type ArrayItemPermission = boolean | ((value: any) => boolean);

export class ArrayMember extends TemplatedMember {

    constructor(name: string, template: Model, validators?: ValidatorFn | ValidatorFn[], data?: {}) {
        super(ElementType.input, MemberType.list, name, template, validators, data);

        this.validationDisplay = ValidationDisplayMode.none;
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

    public getPermission(hasPermission: ArrayItemPermission, value: any): boolean {
        if (typeof hasPermission === 'boolean') {
            return hasPermission as boolean;
        }

        return hasPermission(value);
    }

}