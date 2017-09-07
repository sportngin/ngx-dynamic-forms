import { EventEmitter, OnDestroy, Provider, Type } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { extend } from 'lodash';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { behaviorProvider, BehaviorType, IsRenderedHandler, StateMessageDisplayHandler } from './behavior/behaviors';
import { DynamicFormComponent } from './dynamic.form.component';
import { Model } from './model/model';

export function hostProviders(implementation: Type<any>): Provider[] {
    return [
        {
            provide: FormComponentHost,
            useExisting: implementation
        },
        behaviorProvider(implementation, BehaviorType.isRendered),
        behaviorProvider(implementation, BehaviorType.stateMessageDisplay)
    ];
}

export interface ControlValueInjection {
    control: AbstractControl;
    value: any;
}

export interface FormState {
    submitting?: boolean,
    submitted?: boolean,
    error?: any,
    messages?: { [key: string]: any }
}

export abstract class FormComponentHost<TState extends FormState = FormState> implements OnDestroy, IsRenderedHandler, StateMessageDisplayHandler    {

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
        if (e) {
            e.preventDefault();
        }
        this.clearStateMessages();
        this.doSubmit()
            .then(result => {
                this.state.error = null;
                this.state.submitting = false;
                this.state.submitted = true;
                if (result && result.state) {
                    extend(this.state, result.state);
                }
            }, err => {
                this.state.error = err;
                this.state.submitting = false;
                this.state.submitted = false;
            });
        this.state.submitting = true;
    }

    protected setStateMessage(key: string, value: any): void {
        if (!this.state.messages) {
            this.state.messages = {};
        }
        this.state.messages[key] = value;
    }

    protected clearStateMessages(): void {
        delete this.state.messages;
    }

    protected abstract doSubmit(): Promise<any | { state: FormState }>;

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

    public subscribe(generatorOrNext?: any, error?: any, complete?: any): any {
        return this.events.subscribe(generatorOrNext, error, complete);
    }

    protected emit(event: any): void {
        this.events.emit(event);
    }

    public isChildRendered(form: AbstractControl, key?: string): boolean {
        switch (key) {
            case 'error': return !!this.state.error;
            case 'submitting': return this.state.submitting;
            case 'submitted': return this.state.submitted;
        }
    }

    public showStateMessage(form: AbstractControl, key: string): boolean {
        return this.state.messages && this.state.messages[key];
    }

}