import { ValidatorFn } from '@angular/forms';

import { ElementType }              from '../element/element.type';
import { Model }                    from '../model';
import { ArrayItemPermission }      from './array.member';
import { ArrayMemberBuilder }       from './array.member.builder';
import { MemberType }               from './member.type';
import { TemplatedMemberBase }      from './templated.member.base';
import { ValidationDisplayMode }    from './validation.display.mode';

export class ArrayMemberBase extends TemplatedMemberBase<ArrayMemberBase> implements ArrayMemberBuilder {

    constructor(name: string, template: Model, validators?: ValidatorFn | ValidatorFn[], data?: {}) {
        super(ElementType.input, MemberType.list, name, template, validators, data);

        this.validationDisplay = ValidationDisplayMode.none;
    }

    public renderHeaderRow: boolean = false;
    public keepControlLabels: boolean = false;

    public canEditItem: ArrayItemPermission = true;
    public canAddItem: boolean = true;
    public canRemoveItem: ArrayItemPermission = true;

    public rendersHeaderRow(renderHeaderRow: boolean, keepControlLabels: boolean = false): ArrayMemberBuilder {
        this.renderHeaderRow = renderHeaderRow;
        this.keepControlLabels = keepControlLabels;
        return this;
    }

    public allowEditItem(allowEditItem: ArrayItemPermission): ArrayMemberBuilder {
        this.canEditItem = allowEditItem;
        return this;
    }

    public allowAddItem(allowAddItem: boolean): ArrayMemberBuilder {
        this.canAddItem = allowAddItem;
        return this;
    }

    public allowRemoveItem(allowRemoveItem: ArrayItemPermission): ArrayMemberBuilder {
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