import { EventEmitter, OnDestroy, Provider, Type } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { extend } from 'lodash';

import { Observable }   from 'rxjs/Observable';
import { Observer }     from 'rxjs/Observer';

import { behaviorProvider, BehaviorType, IsRenderedHandler, StateMessageDisplayHandler } from '../behavior';
import { Model } from '../model';
import { DynamicFormComponent } from './dynamic.form.component';
import { FormHostEvent, FormHostEventType } from './form.host.event';

export function hostProviders(implementation: Type<any>): Provider[] {
    return [
        {
            provide: FormHostComponent,
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

export abstract class FormHostComponent<TState extends FormState = FormState> implements OnDestroy, IsRenderedHandler, StateMessageDisplayHandler    {

    private _form: DynamicFormComponent;
    private valueInjectionObserver: Promise<Observer<ControlValueInjection>>;
    public valueInjections: Observable<ControlValueInjection>;
    public state: TState = {} as TState;

    private events: EventEmitter<FormHostEvent> = new EventEmitter<FormHostEvent>();

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
        this.handleSubmit();
    }

    public handleSubmit(): Promise<any> {
        this.clearStateMessages();
        let result = this.doSubmit()
            .then(result => {
                this.state.error = null;
                this.state.submitting = false;
                this.state.submitted = true;
                this.form.form.markAsPristine();
                if (result && result.state) {
                    extend(this.state, result.state);
                }
                this.emit(FormHostEventType.submitted, result);
                return result;
            }, err => {
                this.state.error = err;
                this.state.submitting = false;
                this.state.submitted = false;
                this.emit(FormHostEventType.error, err);
                return Promise.reject(err);
            });
        this.state.submitting = true;
        this.emit(FormHostEventType.submitting, this.form.value);
        return result;
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

    protected emit(type: FormHostEventType, data?: any): void {
        this.events.emit({ type, data });
    }

    public isChildRendered(form: AbstractControl, key?: string): boolean {
        switch (key) {
            case 'error': return !!this.state.error;
            case 'submitting': return this.state.submitting;
            case 'submitted': return this.state.submitted;
        }
        return true;
    }

    public showStateMessage(form: AbstractControl, key: string): boolean {
        return this.state.messages && this.state.messages[key];
    }

}