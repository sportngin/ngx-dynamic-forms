import 'reflect-metadata';

import { Component, Host, Injector }                from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup }  from '@angular/forms';

import { Observable } from 'rxjs/Observable';

import { BehaviorService }      from './behavior/behavior.service';
import { FormComponentHost }    from './form.component.host';
import { Model }                from './model/model';
import { ModelControl }         from './model/control/model.control';
import { HostedElement }        from './hosted.element';

@Component({
    selector: 'dynamic-form',
    templateUrl: 'dynamic.form.pug'
})
export class DynamicFormComponent extends HostedElement {

    public modelControls: ModelControl[];

    constructor(
        private fb: FormBuilder,
        behaviorService: BehaviorService,
        @Host() host: FormComponentHost,
        injector: Injector
    ) {
        super(host.modelDef.toFormGroup(fb), injector, behaviorService, host);

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
