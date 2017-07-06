import { Component }        from '@angular/core';
import { AbstractControl }  from '@angular/forms';

import { behaviorProviders, BehaviorType, hostProviders, IsDisabledHandler, IsRenderedHandler } from '@siplay/ng-dynamic-forms';

import { FieldTestComponent }   from '../field.test.component';
import { FormTestModel }        from './form.test.model';

@Component({
    selector: 'form-test',
    templateUrl: '../field.test.pug',
    viewProviders: [
        hostProviders(FormTestComponent),
        behaviorProviders(FormTestComponent, BehaviorType.isDisabled, BehaviorType.isRendered),
        { provide: 'error', useExisting: FormTestComponent }
    ]
})
export class FormTestComponent extends FieldTestComponent implements IsDisabledHandler, IsRenderedHandler {

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

    public isChildRendered(form: AbstractControl, key: string): boolean {
        return true;
    }

}