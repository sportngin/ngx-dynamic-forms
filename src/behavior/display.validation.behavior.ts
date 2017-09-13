import { InjectionToken }   from '@angular/core';
import { AbstractControl }  from '@angular/forms';

import { behavior, Behavior, BehaviorFn }   from './behavior';
import { BehaviorType }                     from './behavior.type';

export interface DisplayValidationHandler {
    validateDisplay(form: AbstractControl, fieldKey: string, errorKey: string): boolean;
}
export function displayValidationHandlerAccessor<T extends DisplayValidationHandler>(implementation: T): BehaviorFn {
    return implementation.validateDisplay;
}
export const DISPLAY_VALIDATION_HANDLER = new InjectionToken<DisplayValidationHandler>(BehaviorType.validateDisplay);
export const BEHAVIOR_VALIDATE_DISPLAY = behavior<DisplayValidationHandler>(BehaviorType.validateDisplay, DISPLAY_VALIDATION_HANDLER, displayValidationHandlerAccessor);
