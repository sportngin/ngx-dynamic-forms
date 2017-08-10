import { Validators } from '@angular/forms';

import * as moment from 'moment';

import { FormControlType, minDateDiff, Model } from '@siplay/ng-dynamic-forms';

export class DatePickerTestModel extends Model {

    constructor() {
        super(
            Model.member('datepicker', FormControlType.date)
                .addLabel('Date Picker'),

            Model.defaultValueMember('datepicker-existing-value', moment(), FormControlType.date)
                .addLabel('Default Value Date Picker'),

            Model.layout('',
                Model.member('dob', FormControlType.date, Validators.required, minDateDiff(moment.duration(13, 'y')))
                    .addLabel('Date of Birth')
                    .addHelper('You must be 13 years or older to create an account.', '.alert.alert-warning')
            )
        );
    }
}