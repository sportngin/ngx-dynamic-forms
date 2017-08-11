import { FieldType, Model } from '@siplay/ng-dynamic-forms';

export class CheckboxTestModel extends Model {

    constructor() {
        super(
            Model.member('checkbox', FieldType.checkbox)
                .addLabel('Checkbox')
        );
    }
}