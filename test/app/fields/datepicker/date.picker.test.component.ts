import { Component } from '@angular/core';

import { hostProvides } from 'ng-dynamic-forms';

import { FieldTestComponent }   from '../field.test.component';
import { DatePickerTestModel }    from './date.picker.test.model';

@Component({
    selector: 'date-picker-test',
    templateUrl: '../field.test.pug',
    viewProviders: [
        hostProvides(DatePickerTestComponent)
    ]
})
export class DatePickerTestComponent extends FieldTestComponent {

    constructor() {
        super(new DatePickerTestModel());
    }

    protected get fieldName() {
        return 'DatePicker';
    }

    protected get modelSourcePath() {
        return 'test/app/fields/datepicker/date.picker.test.model.ts';
    }

}