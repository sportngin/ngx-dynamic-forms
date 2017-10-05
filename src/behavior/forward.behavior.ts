import { InjectionToken }   from '@angular/core';
import { AbstractControl }  from '@angular/forms';

import { behavior, Behavior, BehaviorFn }   from './behavior';
import { BehaviorType }                     from './behavior.type';

export interface ForwardHandler {
    onForward(form: AbstractControl): void;
}
export function ForwardHandlerAccessor<T extends ForwardHandler>(implementation: T): BehaviorFn {
    return implementation.onForward;
}
export const FORWARD_HANDLER = new InjectionToken<ForwardHandler>(BehaviorType.forward);

export const BEHAVIOR_FORWARD = behavior<ForwardHandler>(BehaviorType.forward, FORWARD_HANDLER, ForwardHandlerAccessor);