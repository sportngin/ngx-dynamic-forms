import { InjectionToken }   from '@angular/core';
import { AbstractControl }  from '@angular/forms';

import { behavior, Behavior, BehaviorFn }   from './behavior';
import { BehaviorType }                     from './behavior.type';

export interface StateMessageDisplayHandler {
    showStateMessage(form: AbstractControl, key: string): boolean;
}
export function stateMessageDisplayHandlerAccessor<T extends StateMessageDisplayHandler>(implementation: T): BehaviorFn {
    return implementation.showStateMessage;
}
export const STATE_MESSAGE_DISPLAY_HANDLER = new InjectionToken<StateMessageDisplayHandler>(BehaviorType.stateMessageDisplay);
export const BEHAVIOR_STATE_MESSAGE_DISPLAY = behavior<StateMessageDisplayHandler>(BehaviorType.stateMessageDisplay, STATE_MESSAGE_DISPLAY_HANDLER, stateMessageDisplayHandlerAccessor);