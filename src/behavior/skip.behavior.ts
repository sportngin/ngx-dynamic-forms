import { InjectionToken }   from '@angular/core';
import { AbstractControl }  from '@angular/forms';

import { behavior, Behavior, BehaviorFn }   from './behavior';
import { BehaviorType }                     from './behavior.type';

export interface SkipHandler {
    onSkip(form: AbstractControl): void;
}
export function SkipHandlerAccessor<T extends SkipHandler>(implementation: T): BehaviorFn {
    return implementation.onSkip;
}
export const SKIP_HANDLER = new InjectionToken<SkipHandler>(BehaviorType.skip);

export const BEHAVIOR_SKIP = behavior<SkipHandler>(BehaviorType.skip, SKIP_HANDLER, SkipHandlerAccessor);