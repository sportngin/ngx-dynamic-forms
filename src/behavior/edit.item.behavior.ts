import { InjectionToken }   from '@angular/core';
import { AbstractControl }  from '@angular/forms';

import { behavior, Behavior, BehaviorFn } from './behavior';
import { BehaviorType }         from './behavior.type';

export interface EditItemHandler {
    onEditItemClick(form: AbstractControl): void;
}
export function editItemHandlerAccessor<T extends EditItemHandler>(implementation: T): BehaviorFn {
    return implementation.onEditItemClick;
}
export const EDIT_ITEM_HANDLER = new InjectionToken<EditItemHandler>(BehaviorType.editItem);
export const BEHAVIOR_EDIT_ITEM = behavior<EditItemHandler>(BehaviorType.editItem, EDIT_ITEM_HANDLER, editItemHandlerAccessor);