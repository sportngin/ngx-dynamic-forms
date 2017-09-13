import { InjectionToken }   from '@angular/core';
import { AbstractControl }  from '@angular/forms';

import { behavior, Behavior, BehaviorFn }   from './behavior';
import { BehaviorType }                     from './behavior.type';

export interface RemoveItemHandler {
    onRemoveItemClick(form: AbstractControl): void;
}
export function removeItemHandlerAccessor<T extends RemoveItemHandler>(implementation: T): BehaviorFn {
    return implementation.onRemoveItemClick;
}
export const REMOVE_ITEM_HANDLER = new InjectionToken<RemoveItemHandler>(BehaviorType.removeItem);
export const BEHAVIOR_REMOVE_ITEM = behavior<RemoveItemHandler>(BehaviorType.removeItem, REMOVE_ITEM_HANDLER, removeItemHandlerAccessor);