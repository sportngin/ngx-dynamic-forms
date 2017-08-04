import { Validators } from '@angular/forms';

import { ColorReadabilityValidator, ControlPosition, FormControlType, Model } from '@siplay/ng-dynamic-forms';

export class ColorPickerTestModel extends Model {

    constructor() {
        super(
            Model.member('colorPicker', FormControlType.color)
                .addLabel('Color Picker (optional)'),

            Model.member('colorPickerRequired', FormControlType.color, Validators.required)
                .addLabel('Color Picker (required)'),

            Model.defaultValueMember('colorPickerWithDefault', '#f00', FormControlType.color)
                .addLabel('Color Picker with Default'),

            Model.member('validateForeground', FormControlType.color, ColorReadabilityValidator.validatorForForeground('validateForeground', 'white'))
                .addLabel('Validate Foreground Readability Against a Color'),

            Model.member('color-preview1', 'color-preview')
                .addData('foregroundColorFieldName', 'validateForeground')
                .addData('backgroundColor', 'white')
                .addData('text', 'Your Foreground'),

            Model.member('validateBackground', FormControlType.color, ColorReadabilityValidator.validatorForBackground('white', 'validateBackground'))
                .addLabel('Validate Background Readability Against a Color'),

            Model.member('color-preview2', 'color-preview')
                .addData('foregroundColor', 'white')
                .addData('backgroundColorFieldName', 'validateBackground')
                .addData('text', 'Your Background'),

            Model.layout('.row',
                Model.layout('.col-6',
                    Model.defaultValueMember('foreground', '#fff', FormControlType.color)
                        .addLabel('Foreground Color')
                ),
                Model.layout('.col-6',
                    Model.defaultValueMember('background', '#f0f0f0', FormControlType.color)
                        .addLabel('Background Color')
                )
            )
                .addHelper('Validate Readability Between Two Fields', '.alert.alert-info', ControlPosition.before),

            Model.validationMessage('background', 'colorReadability', 'Pick a readable pair of colors, please.', '.alert.alert-warning'),

            Model.member('color-preview3', 'color-preview')
                .addData('foregroundColorFieldName', 'foreground')
                .addData('backgroundColorFieldName', 'background')
        );

        this.validator = ColorReadabilityValidator.validatorForFields('foreground', 'background');
    }
}