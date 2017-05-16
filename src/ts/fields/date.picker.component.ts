import { Component, forwardRef, Host, Injector, OnInit } from '@angular/core';
import {
    ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR,
    Validators
} from '@angular/forms';

import { isNumber, map, range } from 'lodash';
import * as moment              from 'moment';

import { FormComponentHost }    from '../form.component.host';
import { FieldBase }            from './field.base';

@Component({
    selector: 'date-picker',
    templateUrl: './date.picker.pug',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => DatePickerComponent),
        multi: true
    }]
})
export class DatePickerComponent extends FieldBase<FormControl> implements ControlValueAccessor, OnInit {

    public months: { name: string, value: number }[] = map(moment.months(), (month: string, index: number) => ({ name: month, value: index }));
    public get days(): number[] {
        let ref = moment([this.dateForm.value.year, this.dateForm.value.month]);
        return range(1, ref.daysInMonth() + 1);
    }
    public get years() {
        let currentYear = moment().year();
        return range(currentYear, currentYear - 100, -1);
    }

    public dateForm: FormGroup;

    private onChangeHandler: Function;
    private onTouchedHandler: Function;

    constructor(
        fb: FormBuilder,
        injector: Injector,
        @Host() host: FormComponentHost
    ) {
        super(injector, host);

        this.dateForm = fb.group({
            month: ['', Validators.required],
            day: ['', Validators.required],
            year: ['', Validators.required]
        });

        this.checkForm();
    }

    ngOnInit(): void {
        this.writeValue(this.formControl.value);
    }

    checkForm(): void {
        if (isNumber(this.dateForm.value.year)) {
            this.dateForm.controls.month.enable();
        } else {
            this.dateForm.controls.month.disable();
        }
        if (isNumber(this.dateForm.value.month)) {
            this.dateForm.controls.day.enable();
        } else {
            this.dateForm.controls.day.disable();
        }

        if (this.dateForm.valid) {
            let value = moment([this.dateForm.value.year, this.dateForm.value.month, this.dateForm.value.day]);
            if (value !== this.formControl.value) {
                this.writeValue(value);
            }
        }
    }

    writeValue(obj: any): void {
        let value = moment(obj);
        if (value.isValid()) {
            this.dateForm.enable();
            this.dateForm.setValue({
                year: value.year(),
                month: value.month(),
                day: value.day()
            });
            this.formControl.setValue(value);
            if (this.onChangeHandler) {
                this.onChangeHandler(value);
            }
        }
    }

    registerOnChange(fn: any): void {
        this.onChangeHandler = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouchedHandler = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        if (isDisabled) {
            this.dateForm.disable();
        } else {
            this.dateForm.enable();
            this.checkForm();
        }
    }

    onTouched(): void {
        if (this.onTouchedHandler) {
            this.onTouchedHandler();
        }
    }

}