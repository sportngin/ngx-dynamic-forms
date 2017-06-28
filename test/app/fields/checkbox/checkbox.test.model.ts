import { FormControlType, Model } from '@siplay/ng-dynamic-forms';

export class CheckboxTestModel extends Model {

    constructor() {
        super(
            Model.member('checkbox', FormControlType.checkbox)
                .addLabel('Checkbox')
        );
    }
}