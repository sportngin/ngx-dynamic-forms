import { Component, Inject, Injector, OnInit, Optional } from '@angular/core';

import { isFunction, map } from 'lodash';

import { FormMemberComponent }  from '../form.member.component';
import { MemberData }           from '../member.data';

@Component({
    selector: 'dropdown-field',
    templateUrl: './dropdown.field.component.pug'
})
export class DropdownFieldComponent extends FormMemberComponent implements OnInit {

    private dataFn: Function;
    private lastValues: any = {};

    public pendingPrerequisites: boolean = false;

    constructor(
        elementData: MemberData,
        @Inject('itemValue') public itemValue: string,
        @Inject('itemLabel') public itemLabel: string,

        @Optional() @Inject('data') public data: any,
        @Optional() @Inject('dependentControls') public dependentControls: string[],

        injector: Injector
    ) {
        super(elementData, injector);


        if (isFunction(data)) {
            this.dataFn = data;
        } else {
            this.data = data;
        }

        if (this.dependentControls) {
            this.pendingPrerequisites = true;
            this.form.valueChanges.subscribe(() => this.checkDependentControls());
        }
    }

    ngOnInit(): void {
        if (this.dependentControls) {
            this.checkDependentControls();
        }
    }

    private checkDependentControls(): void {
        let valid = true;
        let changed = false;
        let args = map(this.dependentControls, (name: string) => {
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
            if (this.data) {
                this.data = null;
            }
            this.pendingPrerequisites = true;
            return;
        }

        if (changed) {
            this.data = this.dataFn(...args);
            this.pendingPrerequisites = false;
        }

    }

}