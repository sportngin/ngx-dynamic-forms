import { Component } from '@angular/core';

import { hostProviders } from '@siplay/ng-dynamic-forms';

import { FieldTestComponent }   from '../field.test.component';
import { DropdownTestModel }    from './dropdown.test.model';

@Component({
    selector: 'dropdown-test',
    templateUrl: '../field.test.component.pug',
    viewProviders: [
        hostProviders(DropdownTestComponent)
    ]
})
export class DropdownTestComponent extends FieldTestComponent {

    constructor() {
        super(new DropdownTestModel());
    }

    public get fieldName() {
        return 'Dropdown';
    }

    public get modelSourcePath() {
        return 'test/app/fields/dropdown/dropdown.test.model.ts';
    }

}
