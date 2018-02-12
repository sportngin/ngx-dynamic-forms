import { Component, Host, Injector, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

import { behaviorProvider, BehaviorType, SubmitHandler } from '../behavior';
import { FormHostComponent }    from './form.host.component';
import { StructuralComponent }  from './structural.component';

@Component({
    selector: 'dynamic-form',
    templateUrl: './dynamic.form.component.pug',
    styleUrls: ['./dynamic.form.component.scss'],
    encapsulation: ViewEncapsulation.None,
    viewProviders: [behaviorProvider(DynamicFormComponent, BehaviorType.submit)]
})
export class DynamicFormComponent extends StructuralComponent implements SubmitHandler {

    constructor(
        private fb: FormBuilder,
        @Host() host: FormHostComponent,
        injector: Injector
    ) {
        super({ form: host.modelDef.toFormGroup(fb), element: null }, host.modelDef.toElements(), injector);
        host.dynamicForm = this;
    }

    ngAfterViewInit(): void {
        super.ngAfterViewInit();
        this.focusFirstInput();
    }

    public get value(): any {
        return this.form.value;
    }

    public onSubmit(): void {
        this.submit(null);
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
