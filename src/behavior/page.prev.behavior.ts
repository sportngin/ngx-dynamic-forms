import { InjectionToken }   from '@angular/core';

import { behavior, Behavior, BehaviorFn }   from './behavior';
import { BehaviorType }                     from './behavior.type';

export interface PagePrevHandler {
    onPagePrev(): void;
}
export function PagePrevHandlerAccessor<T extends PagePrevHandler>(implementation: T): BehaviorFn {
    return implementation.onPagePrev;
}
export const PAGE_PREV_HANDLER = new InjectionToken<PagePrevHandler>(BehaviorType.pagePrev);

export const BEHAVIOR_PAGE_PREV = behavior<PagePrevHandler>(BehaviorType.pagePrev, PAGE_PREV_HANDLER, PagePrevHandlerAccessor);