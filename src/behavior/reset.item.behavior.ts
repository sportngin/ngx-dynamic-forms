import { InjectionToken }   from '@angular/core';
import { AbstractControl }  from '@angular/forms';

import { behavior, Behavior, BehaviorFn }   from './behavior';
import { BehaviorType }                     from './behavior.type';

export interface ResetItemHandler {
    onResetItemClick(form: AbstractControl): void;
}
export function resetItemHandlerAccessor<T extends ResetItemHandler>(implementation: T): BehaviorFn {
    return implementation.onResetItemClick;
}
export const RESET_ITEM_HANDLER = new InjectionToken<ResetItemHandler>(BehaviorType.resetItem);
export const BEHAVIOR_RESET_ITEM = behavior<ResetItemHandler>(BehaviorType.resetItem, RESET_ITEM_HANDLER, resetItemHandlerAccessor);