import { Component } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

import { behaviorProvider, BehaviorType, hostProviders, IsDisabledHandler } from '@siplay/ng-dynamic-forms';

import { SUBMIT_ERROR_HANDLER, SubmitErrorHandler } from '../../submit.error.behavior';
import { FieldTestComponent }   from '../field.test.component';
import { FormTestModel }        from './form.test.model';

@Component({
    selector: 'form-test',
    templateUrl: '../field.test.component.pug',
    viewProviders: [
        hostProviders(FormTestComponent),
        behaviorProvider(FormTestComponent, BehaviorType.isDisabled),
        { provide: SUBMIT_ERROR_HANDLER, useExisting: FormTestComponent }
    ]
})
export class FormTestComponent extends FieldTestComponent implements IsDisabledHandler, SubmitErrorHandler {

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

    public submitError(form: FormGroup, key: string): void {
        console.log(`${this.constructor.name}.submitError() this.form.value:`, this.form.value);
        this.setStateMessage('email-check', true);
    }

    protected doSubmit(): Promise<any> {
        this.clearStateMessages();
        return super.doSubmit();
    }

}