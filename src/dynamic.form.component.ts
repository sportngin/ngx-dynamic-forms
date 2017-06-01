import 'reflect-metadata';

import { Component, Host, Injector }                from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup }  from '@angular/forms';

import { Observable } from 'rxjs/Observable';

import { FormComponentHost }    from './form.component.host';
import { FormElement }          from './form.element';
import { Model }                from './model/model';
import { ModelControl }         from './model/control/model.control';

@Component({
    selector: 'dynamic-form',
    templateUrl: 'dynamic.form.pug'
})
export class DynamicFormComponent extends FormElement {

    public modelControls: ModelControl[];

    constructor(
        private fb: FormBuilder,
        @Host() private host: FormComponentHost,
        injector: Injector
    ) {
        super(injector);

        this.modelControls = this.createControls(host.modelDef);
        this.form = this.createForm(host.modelDef);
        host.form = this;
    }

    private createControls(modelDef: Model): ModelControl[] {
        return modelDef.toControlGroup();
    }

    private createForm(modelDef: Model): FormGroup {
        return modelDef.toFormGroup(this.fb);
    }

    public get value(): any {
        return this.form.value;
    }

    public submit(e: Event): void {
        this.host.submit(e);
    }

    public patchValue(value: { [key: string]: any; }, options?: { onlySelf?: boolean; emitEvent?: boolean; }): void {
        this.form.patchValue(value, options);
    }

    public get controls(): {[key: string]: AbstractControl} {
        return this.form.controls;
    }

    public get valueChanges(): Observable<any> {
        return this.form.valueChanges;
    }

}
