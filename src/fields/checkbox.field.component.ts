import { Component, Injector, Input, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';

import { isBoolean, isFunction } from 'lodash';

import { FieldBase }                        from './field.base';
import { FIELD_DATA_PROVIDER, FieldData }   from './element.data';

@Component({
    selector: 'checkbox-field',
    templateUrl: 'checkbox.field.pug',
    styleUrls: ['./checkbox.field.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CheckboxFieldComponent extends FieldBase<FormControl> implements OnInit {

    @Input() protected checked: boolean | (() => boolean);

    constructor(
        @Inject(FIELD_DATA_PROVIDER) inputData: FieldData,
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