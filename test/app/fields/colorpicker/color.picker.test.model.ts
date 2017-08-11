import { Validators } from '@angular/forms';

import { ColorReadabilityValidator, ControlPosition, FieldType, Model } from '@siplay/ng-dynamic-forms';

export class ColorPickerTestModel extends Model {

    constructor() {
        super(
            Model.member('colorPicker', FieldType.color)
                .addLabel('Color Picker (optional)'),

            Model.member('colorPickerRequired', FieldType.color, Validators.required)
                .addLabel('Color Picker (required)'),

            Model.defaultValueMember('colorPickerWithDefault', '#f00', FieldType.color)
                .addLabel('Color Picker with Default'),

            Model.member('validateForeground', FieldType.color, ColorReadabilityValidator.validatorForForeground('validateForeground', 'white'))
                .addLabel('Validate Foreground Readability Against a Color'),

            Model.member('color-preview1', 'color-preview')
                .addData('foregroundColorFieldName', 'validateForeground')
                .addData('backgroundColor', 'white')
                .addData('text', 'Your Foreground'),

            Model.member('validateBackground', FieldType.color, ColorReadabilityValidator.validatorForBackground('white', 'validateBackground'))
                .addLabel('Validate Background Readability Against a Color'),

            Model.member('color-preview2', 'color-preview')
                .addData('foregroundColor', 'white')
                .addData('backgroundColorFieldName', 'validateBackground')
                .addData('text', 'Your Background'),

            Model.layout('.row',
                Model.layout('.col-6',
                    Model.defaultValueMember('foreground', '#fff', FieldType.color)
                        .addLabel('Foreground Color')
                ),
                Model.layout('.col-6',
                    Model.defaultValueMember('background', '#f0f0f0', FieldType.color)
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