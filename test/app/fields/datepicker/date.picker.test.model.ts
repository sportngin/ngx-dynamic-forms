import { Validators } from '@angular/forms';

import * as moment from 'moment';

import { MemberType, minDateDiff, Model } from '@siplay/ng-dynamic-forms';

export class DatePickerTestModel extends Model {

    constructor() {
        super(
            Model.member('datepicker', MemberType.date)
                .addLabel('Date Picker'),

            Model.defaultValueMember('datepicker-existing-value', moment(), MemberType.date)
                .addLabel('Default Value Date Picker'),

            Model.layout('',
                Model.member('dob', MemberType.date, Validators.required, minDateDiff(moment.duration(13, 'y')))
                    .addLabel('Date of Birth')
                    .addSiblingTip('You must be 13 years or older to create an account.', '.alert.alert-warning')
            )
        );
    }
}