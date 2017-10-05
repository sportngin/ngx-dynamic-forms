import { InjectionToken }   from '@angular/core';
import { AbstractControl }  from '@angular/forms';

import { behavior, Behavior, BehaviorFn }   from './behavior';
import { BehaviorType }                     from './behavior.type';

export interface BackHandler {
    onBack(form: AbstractControl): void;
}
export function BackHandlerAccessor<T extends BackHandler>(implementation: T): BehaviorFn {
    return implementation.onBack;
}
export const BACK_HANDLER = new InjectionToken<BackHandler>(BehaviorType.back);

export const BEHAVIOR_BACK = behavior<BackHandler>(BehaviorType.back, BACK_HANDLER, BackHandlerAccessor);