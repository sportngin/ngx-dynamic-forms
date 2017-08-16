import 'reflect-metadata';

import { Component, Host, Injector, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

import { FormComponentHost }    from './form.component.host';
import { Model }                from './model/model';
import { ModelControl }         from './model/control/model.control';
import { HostedElement }        from './hosted.element';

@Component({
    selector: 'dynamic-form',
    templateUrl: './dynamic.form.pug',
    styleUrls: ['./dynamic.form.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DynamicFormComponent extends HostedElement {

    public modelControls: ModelControl[];

    constructor(
        private fb: FormBuilder,
        @Host() host: FormComponentHost,
        injector: Injector
    ) {
        super({ form: host.modelDef.toFormGroup(fb), control: null }, injector, host);

        this.modelControls = this.createControls(host.modelDef);
        host.form = this;
    }

    private createControls(modelDef: Model): ModelControl[] {
        return modelDef.toControlGroup();
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
