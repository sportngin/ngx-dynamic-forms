import { Validators } from '@angular/forms';

import { FormControlType, Model } from 'ng-dynamic-forms';

export class ColorPickerTestModel extends Model {

    constructor() {
        super(
            Model.member('colorPicker', FormControlType.color)
                .addLabel('Color Picker (optional)'),

            Model.member('colorPickerRequired', FormControlType.color, Validators.required)
                .addLabel('Color Picker (required)'),

            Model.defaultValueMember('colorPickerWithDefault', '#f00', FormControlType.color)
                .addLabel('Color Picker with Default')
        );
    }
}