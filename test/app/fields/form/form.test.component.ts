import { Component } from '@angular/core';

import { hostProviders } from '@siplay/ng-dynamic-forms';

import { FieldTestComponent }   from '../field.test.component';
import { FormTestModel }    from './form.test.model';

@Component({
    selector: 'form-test',
    templateUrl: '../field.test.pug',
    viewProviders: [
        hostProviders(FormTestComponent),
        { provide: 'error', useExisting: FormTestComponent }
    ]
})
export class FormTestComponent extends FieldTestComponent {

    constructor() {
        super(new FormTestModel());
    }

    protected get fieldName() {
        return 'Form';
    }

    protected get modelSourcePath() {
        return 'test/app/fields/form/form.test.model.ts';
    }

    // protected doSubmit(): Promise<any> {
    //
    // }

}