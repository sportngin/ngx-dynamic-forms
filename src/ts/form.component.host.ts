import { EventEmitter, OnDestroy, Provider }    from '@angular/core';
import { AbstractControl }                      from '@angular/forms';

import { Observable }   from 'rxjs/Observable';
import { Observer }     from 'rxjs/Observer';

import { DynamicFormComponent }                         from './dynamic.form.component';
import { UseAltTextHandler, UseAltTextHandlerToken }    from './button.handlers';
import { Model }                                        from './model/model';

export function hostProvides(implementation: any): Provider[] {
    return [{
        provide: FormComponentHost,
        useExisting: implementation
    }, {
        provide: UseAltTextHandlerToken,
        useExisting: implementation
    }]
}

export interface ControlValueInjection {
    control: AbstractControl;
    value: any;
}

export interface FormState {
    submitting?: boolean,
    submitted?: boolean,
    error?: any
}

export abstract class FormComponentHost<TState extends FormState = FormState> implements OnDestroy, UseAltTextHandler {

    private _form: DynamicFormComponent;
    private valueInjectionObserver: Promise<Observer<ControlValueInjection>>;
    public valueInjections: Observable<ControlValueInjection>;
    public state: TState = {} as TState;

    private events: EventEmitter<any> = new EventEmitter();

    constructor(
        public modelDef: Model
    ) {
        this.valueInjectionObserver = new Promise(resolve => {
            this.valueInjections = Observable.create((observer: Observer<ControlValueInjection>) => resolve(observer));
        });
    }

    public submit(e: Event): void {
        e.preventDefault();
        this.doSubmit();
    }

    protected abstract doSubmit(): void;

    public get form(): DynamicFormComponent {
        return this._form;
    }

    public set form(form: DynamicFormComponent) {
        this._form = form;
        this.afterFormInit();
    }

    ngOnDestroy() {
        this.valueInjectionObserver.then(observer => observer.complete());
    }

    protected injectControlValue(control: AbstractControl, value: any): void {
        this.valueInjectionObserver.then(observer => observer.next({
            control,
            value
        }));
    }

    protected afterFormInit(): void {}

    public useAltText(form: AbstractControl): boolean {
        return this.state.submitting;
    }

    public subscribe(generatorOrNext?: any, error?: any, complete?: any): any {
        return this.events.subscribe(generatorOrNext, error, complete);
    }

    protected emit(event: any): void {
        this.events.emit(event);
    }

}