import { Injector, Input }              from '@angular/core';
import { AbstractControl, FormGroup }   from '@angular/forms';

import { every, isFunction } from 'lodash';

import { BehaviorService }  from './behavior/behavior.service';
import { BehaviorFn }       from './behavior/behaviors';
import { ModelControl }     from './model/control/model.control';

export class FormElement {

    @Input() public form: FormGroup;

    private handlers: { [buttonEvent: string]: any } = {
        displayValidation: this
    };

    constructor(
        protected injector: Injector,
        private behaviorService: BehaviorService
    ) {}

    private getHandler(behaviorType: string, optional: boolean): BehaviorFn {
        if (!this.handlers[behaviorType]) {
            let handler = this.behaviorService.getBehaviorHandler(this.injector, behaviorType, optional);

            if (!handler) {
                if (!optional) {
                    console.error('No handler has been configured for button action', behaviorType);
                }
                return;
            }
            this.handlers[behaviorType] = handler;
            return handler;
        }
        return this.handlers[behaviorType];
    }

    public displayValidation(form: AbstractControl, fieldKey: string, errorKey: string): boolean {
        let group = form as FormGroup;
        if (!group) {
            return true;
        }
        if (!group.controls[fieldKey]) {
            throw new Error('Field does not exist!');
        }
        return group.controls[fieldKey].errors && group.controls[fieldKey].errors[errorKey];
    }

    // FIXME: find a better/more generic name, since these are no longer specific to buttons
    public handleBehavior(behaviorAndArgs: string, form: AbstractControl, defaultValue?: any): any {

        let optional = typeof defaultValue !== 'undefined';
        let behaviorArgs = behaviorAndArgs.split(':');
        let behaviorType = behaviorArgs[0];
        let handler = this.getHandler(behaviorType, optional);

        if (!handler) {
            if (!optional) {
                console.error('Could not find a handler for button action', behaviorType);
            }
            return defaultValue;
        }

        return handler(form, ...behaviorArgs.slice(1));

    }

    public isRendered(control: ModelControl): boolean {
        if (!control.renderConditions) {
            return true;
        }

        return every(control.renderConditions, condition => {
            // if (isFunction(condition)) {
            //     return condition(this.form);
            // }

            // FIXME: for some reason, using IsRenderedMethods.parent causes the error "Object prototype may only be an Object or null: undefined
            // if (condition === 'parent') { // IsRenderedMethods.parent) {
            // console.log('isRendered', condition.key, this.constructor, this.form);
                return this.handleBehavior(`${condition.method || 'isRendered'}:${condition.key}`, this.form, true);
            // }

            // return true;
        });
    }

}