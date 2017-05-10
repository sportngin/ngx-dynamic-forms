import { Component, Host, InjectionToken, Injector, Input, OnInit } from '@angular/core';
import { FormControl }                                              from '@angular/forms';

import { isFunction, map } from 'lodash';

import { FormComponentHost }    from '../form.component.host';
import { FieldBase }            from './field.base';

const TOKENS = {
    itemValue: new InjectionToken<string>('itemValue'),
    itemLabel: new InjectionToken<string>('itemLabel'),
    dependentControls: new InjectionToken<string[]>('dependentControls')
};

@Component({
    selector: 'dropdown-field',
    templateUrl: './dropdown.field.pug.html'
})
export class DropdownFieldComponent extends FieldBase<FormControl> implements OnInit {

    @Input() public itemValue: string;
    @Input() public itemLabel: string;
    @Input() public data: any;
    @Input() public dependentControls: string[];

    private dataFn: Function;
    private lastValues: any = {};

    constructor(
        injector: Injector,
        @Host() host: FormComponentHost
    ) {
        super(injector, host);

        this.setProperties(TOKENS);

        let data: any = injector.get('data', null);
        if (isFunction(data)) {
            this.dataFn = data;
        } else {
            this.data = data;
        }

        if (this.dependentControls) {
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
            if (!ctrl || !ctrl.valid) {
                valid = false;
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
            if (!this.formControl.disabled) {
                this.formControl.disable();
            }
            return;
        }

        if (changed) {
            this.data = this.dataFn(...args);
            this.formControl.enable();
        }

    }

}