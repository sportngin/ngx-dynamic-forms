import * as moment from 'moment';

import { FormControlType, Model } from '@siplay/ng-dynamic-forms';

export class DatePickerTestModel extends Model {

    constructor() {
        super(
            Model.member('datepicker', FormControlType.date)
                .addLabel('Date Picker'),

            Model.defaultValueMember('datepicker-existing-value', moment(), FormControlType.date)
        );
    }
}