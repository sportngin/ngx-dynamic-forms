import { InjectionToken }   from '@angular/core';

import { behavior, Behavior, BehaviorFn }   from './behavior';
import { BehaviorType }                     from './behavior.type';

export interface PageNextHandler {
    onPageNext(): void;
}
export function PageNextHandlerAccessor<T extends PageNextHandler>(implementation: T): BehaviorFn {
    return implementation.onPageNext;
}
export const PAGE_NEXT_HANDLER = new InjectionToken<PageNextHandler>(BehaviorType.pageNext);

export const BEHAVIOR_PAGE_NEXT = behavior<PageNextHandler>(BehaviorType.pageNext, PAGE_NEXT_HANDLER, PageNextHandlerAccessor);