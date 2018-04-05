import { Component, Injector, OnInit } from '@angular/core';

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

        if (typeof(this.element.items) === 'function') {
            this.itemsFn = this.element.items;
        } else {
            this.items = this.element.items;
            this.addPlaceholderItem();
        }

        if (this.element.dependentControls && this.element.dependentControls.length) {
            this.pendingPrerequisites = true;
            this.form.valueChanges.subscribe(() => this.checkDependentControls());
        }
    }

    ngOnInit(): void {
        this.checkDependentControls();
    }

    private addPlaceholderItem(): void {
        let hasPlaceholderText = this.element.placeholderText || this.element.placeholderText === '';
        if (hasPlaceholderText && !this.items['__addedPlaceholder']) {
            this.items.unshift({
                [this.element.itemLabelKey]: this.element.placeholderText,
                [this.element.itemValueKey]: null
            });
            this.items['__addedPlaceholder'] = true;
        }
    }

    private checkDependentControls(): void {
        if (!this.element.dependentControls || !this.element.dependentControls.length) {
            return;
        }
        let valid = true;
        let changed = false;
        let args = this.element.dependentControls.map((name: string) => {
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