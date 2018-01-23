import { ValidatorFn } from '@angular/forms';

import { DisplayValueMember, DisplayValueMemberBase } from './display.value.member';
import { MemberType }         from './member.type';
import { ModelMemberBuilder } from './model.member.builder';

export type SelectionMemberItem = { [key: string]: any };

export type SelectionMemberDependentItems1 = (arg: any) => SelectionMemberItem[];
export type SelectionMemberDependentItems2 = (arg1: any, arg2: any) => SelectionMemberItem[];
export type SelectionMemberDependentItems3 = (arg1: any, arg2: any, arg3: any) => SelectionMemberItem[];
export type SelectionMemberDependentItems4 = (arg1: any, arg2: any, arg3: any, arg4: any) => SelectionMemberItem[];
export type SelectionMemberDependentItemsAny = (...args: any[]) => SelectionMemberItem[];
export type SelectionMemberDependentItems =
    SelectionMemberDependentItems1 |
    SelectionMemberDependentItems2 |
    SelectionMemberDependentItems3 |
    SelectionMemberDependentItems4 |
    SelectionMemberDependentItemsAny;

export type SelectionMemberItems = SelectionMemberItem[] | SelectionMemberDependentItems;

export interface SelectionMember extends DisplayValueMember {

    dependentControls: string[];
    items: SelectionMemberItems;
    itemLabelKey: string;
    itemValueKey?: string;
    placeholderText: string;
}

export interface SelectionMemberBuilder
    extends ModelMemberBuilder<SelectionMemberBuilder>, SelectionMember {

    addPlaceholderText(text?: string): SelectionMemberBuilder;
    addDependentControls(...controlNames: string[]): SelectionMemberBuilder;

}

export class SelectionMemberBase extends DisplayValueMemberBase<SelectionMemberBase> implements SelectionMemberBuilder {

    public items: SelectionMemberItems;
    public itemLabelKey: string;
    public itemValueKey?: string;
    public placeholderText: string;
    public dependentControls: string[];

    constructor(name: string, items: SelectionMemberItems, itemLabelKey: string, itemValueKey?: string, validators?: ValidatorFn | ValidatorFn[]) {
        super(MemberType.dropdown, name, validators);

        this.items = items;
        this.itemLabelKey = itemLabelKey;
        this.itemValueKey = itemValueKey;
    }

    private getDisplayValueForItems(items: SelectionMemberItem[], value: any): string {
        let item = items.find((item: any) => item[this.itemValueKey] === value);
        return item ? item[this.itemLabelKey] : null;
    }

    public getDisplayValue(value: any): string {
        if (Array.isArray(this.items)) {
            return this.getDisplayValueForItems(this.items, value);
        }
        return null;
    }

    public addPlaceholderText(text: string = ''): SelectionMemberBase {
        this.placeholderText = text;
        return this;
    }

    public addDependentControls(...controlNames: string[]): SelectionMemberBase {
        if (!this.dependentControls) {
            this.dependentControls = [];
        }
        this.dependentControls.push(...controlNames);
        return this;
    }

}