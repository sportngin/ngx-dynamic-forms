import { InjectionToken }   from '@angular/core';
import { AbstractControl }  from '@angular/forms';

import { behavior, Behavior, BehaviorFn }   from './behavior';
import { BehaviorType }                     from './behavior.type';

export interface IsDisabledHandler {
    isDisabled(form: AbstractControl): boolean;
}
export function isDisabledHandlerAccessor<T extends IsDisabledHandler>(implementation: T): BehaviorFn {
    return implementation.isDisabled;
}
export const IS_DISABLED_HANDLER = new InjectionToken<IsDisabledHandler>(BehaviorType.isDisabled);
export const BEHAVIOR_IS_DISABLED = behavior<IsDisabledHandler>(BehaviorType.isDisabled, IS_DISABLED_HANDLER, isDisabledHandlerAccessor);