import { FormControlType, Model } from 'ng-dynamic-forms';

export class DatePickerTestModel extends Model {

    constructor() {
        super(
            Model.member('datepicker', FormControlType.date)
                .addLabel('Date Picker')
        );
    }
}