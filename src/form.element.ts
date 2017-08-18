import { ElementRef, Injector, Renderer2 } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

import { every, isFunction } from 'lodash';

import { BehaviorService }  from './behavior/behavior.service';
import { BehaviorFn, BehaviorType, DisplayValidationHandler } from './behavior/behaviors';
import { ModelControl }     from './model/control/model.control';
import { ElementHelper }    from './model/model.element';

export abstract class FormElement implements DisplayValidationHandler {

    private handlers: { [behaviorType: string]: any } = {};
    private behaviorService: BehaviorService;
    private _renderer: Renderer2;
    private _elementRef: ElementRef;

    private get renderer(): Renderer2 {
        if (!this._renderer) {
            this._renderer = this.injector.get(Renderer2);
        }
        return this._renderer;
    }

    private get elementRef(): ElementRef {
        if (!this._elementRef) {
            this._elementRef = this.injector.get(ElementRef);
        }
        return this._elementRef;
    }

    constructor(
        public form: FormGroup,
        protected injector: Injector
    ) {
        this.behaviorService = injector.get(BehaviorService);
        this.handlers[BehaviorType.validateDisplay] = this.behaviorService.getHandler(BehaviorType.validateDisplay, this, false);
    }

    protected addCssClass(...cssClasses: string[]): void {
        cssClasses.forEach(cssClass => cssClass && this.renderer.addClass(this.elementRef.nativeElement, cssClass));
    }

    protected removeCssClass(...cssClasses: string[]): void {
        cssClasses.forEach(cssClass => cssClass && this.renderer.removeClass(this.elementRef.nativeElement, cssClass));
    }

    protected setAttribute(name: string, value: any, namespace?: string): void {
        this.renderer.setAttribute(this.elementRef.nativeElement, name, value, namespace);
    }

    private getHandler(behaviorType: string, optional: boolean): BehaviorFn {
        if (!this.handlers[behaviorType]) {
            let handler = this.behaviorService.getBehaviorHandler(this.injector, behaviorType, optional);

            if (!handler) {
                if (!optional) {
                    console.error('No handler has been configured for behavior type', behaviorType);
                }
                return;
            }
            this.handlers[behaviorType] = handler;
            return handler;
        }
        return this.handlers[behaviorType];
    }

    public validateDisplay(form: AbstractControl, fieldKey: string, errorKey: string): boolean {
        let group = form as FormGroup;
        if (!group) {
            return true;
        }
        if (!group.controls[fieldKey]) {
            throw new Error('Field does not exist!');
        }

        // don't show if the field is pristine or untouched
        if (group.controls[fieldKey].pristine || group.controls[fieldKey].untouched) {
            return false;
        }
        // validators applied to a specific control will add errors to the control instance
        let controlErrors = group.controls[fieldKey].errors && group.controls[fieldKey].errors[errorKey];
        // validators applied to a group in order to do multi-control validation will add errors to the group instance
        let groupErrors = group.errors && group.errors[fieldKey] && group.errors[fieldKey][errorKey];
        return controlErrors || groupErrors;
    }

    public handleBehavior(behaviorAndArgs: string, form: AbstractControl, defaultValue?: any): any {

        let optional = typeof defaultValue !== 'undefined';
        let behaviorArgs = behaviorAndArgs.split(':');
        let behaviorType = behaviorArgs[0];
        let handler = this.getHandler(behaviorType, optional);

        if (!handler) {
            if (!optional) {
                console.error('Could not find a handler for behavior', behaviorType);
            }
            return defaultValue;
        }

        return handler(form, ...behaviorArgs.slice(1));

    }

    public isRendered(control: ModelControl | ElementHelper): boolean {

        if (!control.renderConditions) {
            return true;
        }

        return every(control.renderConditions, condition => {
            // if (isFunction(condition)) {
            //     return condition(this.form);
            // }

            // FIXME: for some reason, using IsRenderedMethods.parent causes the error "Object prototype may only be an Object or null: undefined
            // if (condition === 'parent') { // IsRenderedMethods.parent) {
            // console.log('isRendered', condition.key, this.constructor, this.form, !condition.required);
                return this.handleBehavior(`${condition.method || 'isRendered'}:${condition.key}`, this.form, condition.required ? undefined : true);
            // }

            // return true;
        });
    }

}