import { MemberType, Model } from '@siplay/ng-dynamic-forms';

export class CheckboxTestModel extends Model {

    constructor() {
        super(
            Model.member('checkbox', MemberType.checkbox)
                .addLabel('Checkbox')
        );
    }
}