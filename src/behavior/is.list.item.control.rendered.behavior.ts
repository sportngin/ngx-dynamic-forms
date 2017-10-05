import { InjectionToken }   from '@angular/core';
import { AbstractControl }  from '@angular/forms';

import { behavior, Behavior, BehaviorFn }   from './behavior';
import { BehaviorType }                     from './behavior.type';

export interface IsListItemControlRenderedHandler {
    isListItemControlRendered(form: AbstractControl, key: string): boolean;
}
export function isListItemControlRenderedHandlerAccessor<T extends IsListItemControlRenderedHandler>(implementation: T): BehaviorFn {
    return implementation.isListItemControlRendered;
}
export const IS_LIST_ITEM_CONTROL_RENDERED_HANDLER = new InjectionToken<IsListItemControlRenderedHandler>(BehaviorType.isListItemControlRendered);
export const BEHAVIOR_IS_LIST_ITEM_CONTROL_RENDERED = behavior<IsListItemControlRenderedHandler>(BehaviorType.isListItemControlRendered, IS_LIST_ITEM_CONTROL_RENDERED_HANDLER, isListItemControlRenderedHandlerAccessor);