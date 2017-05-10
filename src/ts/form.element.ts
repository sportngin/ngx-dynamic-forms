import { Injector, Input }              from '@angular/core';
import { AbstractControl, FormGroup }   from '@angular/forms';

import { every, isFunction } from 'lodash';

import { HandlerMethods, HandlerTokens }    from './button.handlers';
import { ModelControl }                     from './model/control/model.control';

export class FormElement {

    @Input() public form: FormGroup;

    private handlers: { [buttonEvent: string]: any } = {};

    constructor(
        protected injector: Injector
    ) {}

    private getHandler(buttonEvent: string, optional: boolean) {
        if (!this.handlers[buttonEvent]) {
            let token = HandlerTokens[buttonEvent];

            if (!token) {
                if (!optional) {
                    console.error('No handler has been configured for button action', buttonEvent);
                }
                return;
            }

            let handler = this.injector.get(token, optional ? Injector.NULL : Injector.THROW_IF_NOT_FOUND);
            this.handlers[buttonEvent] = handler;
            return handler;
        }
        return this.handlers[buttonEvent];
    }

    // FIXME: find a better/more generic name, since these are no longer specific to buttons
    public handleButtonEvent(buttonEventAndArgs: string, form: AbstractControl, defaultValue?: any): any {

        let optional = typeof defaultValue !== 'undefined';
        let buttonEventArgs = buttonEventAndArgs.split(':');
        let buttonEvent = buttonEventArgs[0];
        let handler = this.getHandler(buttonEvent, optional);

        if (!handler || handler === Injector.NULL) {
            if (!optional) {
                console.error('Could not find a handler for button action', buttonEvent);
            }
            return defaultValue;
        }

        return handler[HandlerMethods[buttonEvent]](form, ...buttonEventArgs.slice(1));

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
                return this.handleButtonEvent(`isRendered:${condition.key}`, this.form, true);
            // }

            // return true;
        })
    }

}