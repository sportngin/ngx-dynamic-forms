import { Component } from '@angular/core';

import { hostProviders } from '@siplay/ng-dynamic-forms';

import { ColorPickerTestModel } from './color.picker.test.model';
import { FieldTestComponent }   from '../field.test.component';

@Component({
    selector: 'color-picker-test',
    templateUrl: '../field.test.component.pug',
    viewProviders: [
        hostProviders(ColorPickerTestComponent)
    ]
})
export class ColorPickerTestComponent extends FieldTestComponent {

    constructor() {
        super(new ColorPickerTestModel());
    }

    public get fieldName() {
        return 'Color Picker';
    }

    public get modelSourcePath() {
        return 'test/app/fields/checkbox/color.picker.test.model.ts';
    }

}
