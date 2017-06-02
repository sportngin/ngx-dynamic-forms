import { FormControlType, Model } from 'ng-dynamic-forms';

export class CheckboxTestModel extends Model {

    constructor() {
        super(
            Model.member('checkbox', FormControlType.checkbox)
                .addLabel('Checkbox')
        );
    }
}