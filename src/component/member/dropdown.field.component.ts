import { Component, Injector, OnInit } from '@angular/core';

import { isFunction, map } from 'lodash';

import { SelectionMember, SelectionMemberItem } from '../../model/member';
import { FormMemberComponent }  from '../form.member.component';
import { MemberData }           from '../member.data';

@Component({
    selector: 'dropdown-field',
    templateUrl: './dropdown.field.component.pug'
})
export class DropdownFieldComponent extends FormMemberComponent<SelectionMember> implements OnInit {

    public items: SelectionMemberItem[];
    private itemsFn: Function;
    private lastValues: any = {};

    public pendingPrerequisites: boolean = false;

    constructor(
        elementData: MemberData,
        injector: Injector
    ) {
        super(elementData, injector);

        if (isFunction(this.element.items)) {
            this.itemsFn = this.element.items;
        } else {
            this.items = this.element.items;
            this.addPlaceholderItem();
        }

        if (this.element.dependentControls) {
            this.pendingPrerequisites = true;
            this.form.valueChanges.subscribe(() => this.checkDependentControls());
        }
    }

    ngOnInit(): void {
        if (this.element.dependentControls) {
            this.checkDependentControls();
        }
    }

    private addPlaceholderItem(): void {
        if (this.element.placeholderText) {
            this.items.unshift({
                [this.element.itemLabelKey]: this.element.placeholderText,
                [this.element.itemValueKey]: null
            });
        }
    }

    private checkDependentControls(): void {
        let valid = true;
        let changed = false;
        let args = map(this.element.dependentControls, (name: string) => {
            let ctrl = this.form.controls[name];
            if (!ctrl || (ctrl.value === null || ctrl.value === '' || ctrl.value === undefined)) {
                valid = false;
                this.lastValues[name] = ctrl.value;
                return null;
            }
            if (ctrl.value !== this.lastValues[name]) {
                changed = true;
                this.lastValues[name] = ctrl.value;
            }
            return ctrl.value;
        });

        if (!valid) {
            if (this.items) {
                this.items = null;
            }
            this.pendingPrerequisites = true;
            return;
        }

        if (changed) {
            this.items = this.itemsFn(...args);
            this.addPlaceholderItem();
            this.pendingPrerequisites = false;
        }

    }

}