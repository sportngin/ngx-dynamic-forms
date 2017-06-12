import { Component, Host, InjectionToken, Injector, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';

import { isBoolean, isFunction } from 'lodash';

import { FormComponentHost }    from '../form.component.host';
import { FieldBase }            from './field.base';

const TOKENS = {
    checked: new InjectionToken<boolean | (() => boolean)>('checked')
};

@Component({
    selector: 'checkbox-field',
    templateUrl: 'checkbox.field.pug',
    styleUrls: ['./checkbox.field.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CheckboxFieldComponent extends FieldBase<FormControl> implements OnInit {

    @Input() protected checked: boolean | (() => boolean);

    constructor(
        injector: Injector,
        @Host() host: FormComponentHost
    ) {
        super(injector, host, TOKENS);
    }

    ngOnInit(): void {
        let checked = false;

        if (isBoolean(this.checked)) {
            checked = this.checked;
        } else if (isFunction(this.checked)) {
            checked = this.checked();
        }
        setTimeout(() => this.formControl.setValue(checked || false), 0);
    }

    toggle(): void {
        this.formControl.setValue(!this.formControl.value);
    }
}