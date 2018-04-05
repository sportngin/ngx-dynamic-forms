import { Component } from '@angular/core';

import { hostProviders } from '@siplay/ng-dynamic-forms';

import { FieldTestComponent }   from '../field.test.component';
import { DatePickerTestModel }  from './date.picker.test.model';

@Component({
    selector: 'date-picker-test',
    templateUrl: '../field.test.component.pug',
    viewProviders: [
        hostProviders(DatePickerTestComponent)
    ]
})
export class DatePickerTestComponent extends FieldTestComponent {

    constructor() {
        super(new DatePickerTestModel());
    }

    public get fieldName() {
        return 'DatePicker';
    }

    public get modelSourcePath() {
        return 'test/app/fields/datepicker/date.picker.test.model.ts';
    }

}
