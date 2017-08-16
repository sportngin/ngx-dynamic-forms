import { Component } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { behaviorProvider, BehaviorType, hostProviders, IsDisabledHandler } from '@siplay/ng-dynamic-forms';

import { FieldTestComponent } from '../field.test.component';
import { FormTestModel } from './form.test.model';

@Component({
    selector: 'form-test',
    templateUrl: '../field.test.component.pug',
    viewProviders: [
        hostProviders(FormTestComponent),
        behaviorProvider(FormTestComponent, BehaviorType.isDisabled),
        { provide: 'error', useExisting: FormTestComponent }
    ]
})
export class FormTestComponent extends FieldTestComponent implements IsDisabledHandler {

    constructor() {
        super(new FormTestModel());
    }

    protected get fieldName() {
        return 'Form';
    }

    protected get modelSourcePath() {
        return 'test/app/fields/form/form.test.model.ts';
    }

    public isDisabled(form: AbstractControl): boolean {
        return false;
    }

}