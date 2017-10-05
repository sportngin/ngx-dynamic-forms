import { InjectionToken }   from '@angular/core';
import { AbstractControl }  from '@angular/forms';

import { behavior, Behavior, BehaviorFn }   from './behavior';
import { BehaviorType }                     from './behavior.type';

export interface IsRenderedHandler {
    isChildRendered(form: AbstractControl, key?: string): boolean;
}
export function isRenderedHandlerAccessor<T extends IsRenderedHandler>(implementation: T): BehaviorFn {
    return implementation.isChildRendered;
}
export const IS_RENDERED_HANDLER = new InjectionToken<IsRenderedHandler>(BehaviorType.isRendered);
export const BEHAVIOR_IS_RENDERED = behavior<IsRenderedHandler>(BehaviorType.isRendered, IS_RENDERED_HANDLER, isRenderedHandlerAccessor);