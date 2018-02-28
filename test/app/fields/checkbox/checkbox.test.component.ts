import { Component } from '@angular/core';

import { hostProviders } from '@siplay/ng-dynamic-forms';

import { FieldTestComponent }   from '../field.test.component';
import { CheckboxTestModel }    from './checkbox.test.model';

@Component({
    selector: 'checkbox-test',
    templateUrl: '../field.test.component.pug',
    viewProviders: [
        hostProviders(CheckboxTestComponent)
    ]
})
export class CheckboxTestComponent extends FieldTestComponent {

    constructor() {
        super(new CheckboxTestModel());
    }

    public get fieldName() {
        return 'Checkbox';
    }

    public get modelSourcePath() {
        return 'test/app/fields/checkbox/checkbox.test.model.ts';
    }

}
