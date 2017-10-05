import { InjectionToken }   from '@angular/core';
import { AbstractControl }  from '@angular/forms';

import { behavior, Behavior, BehaviorFn }   from './behavior';
import { BehaviorType }                     from './behavior.type';

export interface SubmitHandler {
    onSubmit(form: AbstractControl): void;
}
export function submitHandlerAccessor<T extends SubmitHandler>(implementation: T): BehaviorFn {
    return implementation.onSubmit;
}
export const SUBMIT_HANDLER = new InjectionToken<SubmitHandler>(BehaviorType.submit);
export const BEHAVIOR_SUBMIT = behavior<SubmitHandler>(BehaviorType.submit, SUBMIT_HANDLER, submitHandlerAccessor);