import { Component } from '@angular/core';

import { hostProvides } from 'ng-dynamic-forms';

import { FieldTestComponent }   from '../field.test.component';
import { DropdownTestModel }    from './dropdown.test.model';

@Component({
    selector: 'dropdown-test',
    templateUrl: '../field.test.pug',
    viewProviders: [
        hostProvides(DropdownTestComponent)
    ]
})
export class DropdownTestComponent extends FieldTestComponent {

    constructor() {
        super(new DropdownTestModel());
    }

    protected get fieldName() {
        return 'Dropdown';
    }

    protected get modelSourcePath() {
        return 'test/app/fields/dropdown/dropdown.test.model.ts';
    }

}