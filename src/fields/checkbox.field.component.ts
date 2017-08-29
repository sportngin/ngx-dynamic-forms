import { Component, Injector, Input, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';

import { isBoolean, isFunction } from 'lodash';

import { FieldBase }   from './field.base';
import { FieldData }   from './field.data';

@Component({
    selector: 'checkbox-field',
    templateUrl: 'checkbox.field.component.pug',
    styleUrls: ['./checkbox.field.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CheckboxFieldComponent extends FieldBase<FormControl> implements OnInit {

    @Input() protected checked: boolean | (() => boolean);

    constructor(
        inputData: FieldData,
        injector: Injector
    ) {
        super(inputData, injector);
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