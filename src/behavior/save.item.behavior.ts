import { InjectionToken }   from '@angular/core';
import { AbstractControl }  from '@angular/forms';

import { behavior, Behavior, BehaviorFn }   from './behavior';
import { BehaviorType }                     from './behavior.type';

export interface SaveItemHandler {
    onSaveItemClick(form: AbstractControl): void;
}
export function saveItemHandlerAccessor<T extends SaveItemHandler>(implementation: T): BehaviorFn {
    return implementation.onSaveItemClick;
}
export const SAVE_ITEM_HANDLER = new InjectionToken<SaveItemHandler>(BehaviorType.saveItem);

export const BEHAVIOR_SAVE_ITEM = behavior<SaveItemHandler>(BehaviorType.saveItem, SAVE_ITEM_HANDLER, saveItemHandlerAccessor);