import { Component, forwardRef, Injector, OnInit, ViewEncapsulation } from '@angular/core';
import {
    ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators
} from '@angular/forms';

import { isEqual, range }  from 'lodash-es';
import { DateTime, Info } from 'luxon';

import { FormMemberComponent }  from '../form.member.component';
import { MemberData }           from '../member.data';

@Component({
    selector: 'date-picker',
    templateUrl: './date.picker.component.pug',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => DatePickerComponent),
        multi: true
    }],
    styleUrls: ['./date.picker.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DatePickerComponent extends FormMemberComponent implements ControlValueAccessor, OnInit {

    public months: { name: string, value: number }[] = Info.months().map((month: string, index: number) => ({ name: month, value: index }));
    public get days(): number[] {
        let ref = DateTime.fromObject({ year: this.dateForm.value.year, month: this.dateForm.value.month });
        if (!ref.isValid) {
            return range(1, 32);
        }
        return range(1, ref.daysInMonth + 1);
    }
    public get years() {
        let currentYear = new DateTime().year;
        return range(currentYear, currentYear - 100, -1);
    }

    public dateForm: FormGroup;

    private onChangeHandler: Function;
    private onTouchedHandler: Function;

    constructor(
        elementData: MemberData,
        fb: FormBuilder,
        injector: Injector
    ) {
        super(elementData, injector);

        this.dateForm = fb.group({
            year: ['Year', Validators.required],
            month: ['Month', Validators.required],
            day: ['Day', Validators.required]
        });
    }

    ngOnInit(): void {
        if (this.element.disabled) {
            this.dateForm.disable();
        } else {
            this.dateForm.valueChanges.subscribe(() => this.checkForm());
            this.writeValue(this.formControl.value);
        }
    }

    private checkForm(): void {

        if (this.dateForm.valid) {
            let value = DateTime.fromObject({
                year: this.dateForm.value.year,
                month: this.dateForm.value.month,
                day: this.dateForm.value.day,
            });

            // check to see if a change in month has caused the date to become invalid
            if (!value.isValid) {

                let month = DateTime.fromObject({
                    year: this.dateForm.value.year,
                    month: this.dateForm.value.month,
                });

                // if the year+month are not valid, don't bother
                if (!month.isValid) {
                    return;
                }

                // if the selected day of the month is more than the number of days in the month
                // (e.g. going from July to June), just default to the last valid day of the current month
                if (this.dateForm.value.day > month.daysInMonth) {
                    this.dateForm.controls.day.setValue(month.daysInMonth);
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
        value = DateTime.fromMillis(value);
        if (value.isValid) {
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