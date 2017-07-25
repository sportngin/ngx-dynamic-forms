import { Component, forwardRef, Host, Injector, OnInit, ViewEncapsulation } from '@angular/core';
import {
    ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR,
    Validators
} from '@angular/forms';

import { isEqual, map, range }  from 'lodash';
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
    }],
    styleUrls: ['./date.picker.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DatePickerComponent extends FieldBase<FormControl> implements ControlValueAccessor, OnInit {

    public months: { name: string, value: number }[] = map(moment.months(), (month: string, index: number) => ({ name: month, value: index }));
    public get days(): number[] {
        let ref = moment([this.dateForm.value.year, this.dateForm.value.month]);
        if (!ref.isValid()) {
            return range(1, 32);
        }
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
            year: ['Year', Validators.required],
            month: ['Month', Validators.required],
            day: ['Day', Validators.required]
        });
    }

    ngOnInit(): void {
        if (this.control.disabled) {
            this.dateForm.disable();
        } else {
            this.dateForm.valueChanges.subscribe(() => this.checkForm());
            this.writeValue(this.formControl.value);
        }
    }

    private checkForm(): void {

        if (this.dateForm.valid) {
            let value = moment([this.dateForm.value.year, this.dateForm.value.month, this.dateForm.value.day]);

            // check to see if a change in month has caused the date to become invalid
            if (!value.isValid()) {

                let month = moment([this.dateForm.value.year, this.dateForm.value.month]);

                // if the year+month are not valid, don't bother
                if (!month.isValid()) {
                    return;
                }

                // if the selected day of the month is more than the number of days in the month
                // (e.g. going from July to June), just default to the last valid day of the current month
                if (this.dateForm.value.day > month.daysInMonth()) {
                    this.dateForm.controls.day.setValue(month.daysInMonth());
                    return;
                }
            }

            if (value !== this.formControl.value) {
                this.writeValue(value);
            }
        }
    }

    writeValue(value: any): void {
        if (!value) {
            return;
        }
        value = moment(value);
        if (value.isValid()) {
            if (!this.dateForm.enabled) {
                this.dateForm.enable();
            }
            let newDateFormValue = {
                year: value.year(),
                month: value.month(),
                day: value.date()
            };
            if (!isEqual(this.dateForm.value, newDateFormValue)) {
                this.dateForm.setValue(newDateFormValue);
            }
            if (this.formControl.value.valueOf() !== value.valueOf()) {
                this.formControl.setValue(value);
                if (this.onChangeHandler) {
                    this.onChangeHandler(value);
                }
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