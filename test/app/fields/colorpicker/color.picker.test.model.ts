import { Validators } from '@angular/forms';

import { ColorReadabilityValidator, ElementSiblingPosition, MemberType, Model } from '@siplay/ng-dynamic-forms';

export class ColorPickerTestModel extends Model {

    constructor() {
        super(
            Model.member('colorPicker', MemberType.color)
                .addLabel('Color Picker (optional)'),

            Model.member('colorPickerRequired', MemberType.color, Validators.required)
                .addLabel('Color Picker (required)'),

            Model.defaultValueMember('colorPickerWithDefault', '#f00', MemberType.color)
                .addLabel('Color Picker with Default'),

            Model.member('validateForeground', MemberType.color, ColorReadabilityValidator.validatorForForeground('validateForeground', 'white'))
                .addLabel('Validate Foreground Readability Against a Color'),

            Model.member('color-preview1', 'color-preview')
                .addData('foregroundColorFieldName', 'validateForeground')
                .addData('backgroundColor', 'white')
                .addData('text', 'Your Foreground'),

            Model.member('validateBackground', MemberType.color, ColorReadabilityValidator.validatorForBackground('white', 'validateBackground'))
                .addLabel('Validate Background Readability Against a Color'),

            Model.member('color-preview2', 'color-preview')
                .addData('foregroundColor', 'white')
                .addData('backgroundColorFieldName', 'validateBackground')
                .addData('text', 'Your Background'),

            Model.layout('.row',
                Model.layout('.col-6',
                    Model.defaultValueMember('foreground', '#fff', MemberType.color)
                        .addLabel('Foreground Color')
                ),
                Model.layout('.col-6',
                    Model.defaultValueMember('background', '#f0f0f0', MemberType.color)
                        .addLabel('Background Color')
                )
            )
                .addSiblingTip('Validate Readability Between Two Fields', '.alert.alert-info', ElementSiblingPosition.before),

            Model.validationMessage('background', 'colorReadability', 'Pick a readable pair of colors, please.', '.alert.alert-warning'),

            Model.member('color-preview3', 'color-preview')
                .addData('foregroundColorFieldName', 'foreground')
                .addData('backgroundColorFieldName', 'background')
        );

        this.validator = ColorReadabilityValidator.validatorForFields('foreground', 'background');
    }
}