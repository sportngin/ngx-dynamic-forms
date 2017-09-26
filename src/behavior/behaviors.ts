import { Provider, Type } from '@angular/core';

import { Behavior }     from './behavior';
import { BehaviorType } from './behavior.type';

import { BEHAVIOR_BACK }                from './back.behavior';
import { BEHAVIOR_EDIT_ITEM }           from './edit.item.behavior';
import { BEHAVIOR_FORWARD }             from './forward.behavior';
import { BEHAVIOR_IS_DISABLED }         from './is.disabled.behavior';
import { BEHAVIOR_IS_LIST_ITEM_CONTROL_RENDERED } from './is.list.item.control.rendered.behavior';
import { BEHAVIOR_IS_RENDERED }         from './is.rendered.behavior';
import { BEHAVIOR_PAGE_NEXT }           from './page.next.behavior';
import { BEHAVIOR_PAGE_PREV }           from './page.prev.behavior';
import { BEHAVIOR_REMOVE_ITEM }         from './remove.item.behavior';
import { BEHAVIOR_RESET_ITEM }          from './reset.item.behavior';
import { BEHAVIOR_SAVE_ITEM }           from './save.item.behavior';
import { BEHAVIOR_SKIP }                from './skip.behavior';
import { BEHAVIOR_STATE_MESSAGE_DISPLAY } from './state.message.display.behavior';
import { BEHAVIOR_SUBMIT }              from './submit.behavior';
import { BEHAVIOR_VALIDATE_DISPLAY }    from './display.validation.behavior';

export const BUILT_IN_BEHAVIORS: Behavior[] = [
    BEHAVIOR_BACK,
    BEHAVIOR_EDIT_ITEM,
    BEHAVIOR_FORWARD,
    BEHAVIOR_IS_DISABLED,
    BEHAVIOR_IS_LIST_ITEM_CONTROL_RENDERED,
    BEHAVIOR_IS_RENDERED,
    BEHAVIOR_PAGE_NEXT,
    BEHAVIOR_PAGE_PREV,
    BEHAVIOR_REMOVE_ITEM,
    BEHAVIOR_RESET_ITEM,
    BEHAVIOR_SAVE_ITEM,
    BEHAVIOR_SKIP,
    BEHAVIOR_STATE_MESSAGE_DISPLAY,
    BEHAVIOR_SUBMIT,
    BEHAVIOR_VALIDATE_DISPLAY
];

export const BUILT_IN_BEHAVIORS_MAP: { [key: string]: Behavior } = {
    back: BEHAVIOR_BACK,
    editItem: BEHAVIOR_EDIT_ITEM,
    forward: BEHAVIOR_FORWARD,
    isDisabled: BEHAVIOR_IS_DISABLED,
    isListItemControlRendered: BEHAVIOR_IS_LIST_ITEM_CONTROL_RENDERED,
    isRendered: BEHAVIOR_IS_RENDERED,
    pageNext: BEHAVIOR_PAGE_NEXT,
    pagePrev: BEHAVIOR_PAGE_PREV,
    removeItem: BEHAVIOR_REMOVE_ITEM,
    resetItem: BEHAVIOR_RESET_ITEM,
    saveItem: BEHAVIOR_SAVE_ITEM,
    skip: BEHAVIOR_SKIP,
    stateMessageDisplay: BEHAVIOR_STATE_MESSAGE_DISPLAY,
    submit: BEHAVIOR_SUBMIT,
    validateDisplay: BEHAVIOR_VALIDATE_DISPLAY
};

export function behaviorProvider(implementation: Type<any>, type: BehaviorType): Provider {
    return { provide: BUILT_IN_BEHAVIORS_MAP[type].token, useExisting: implementation };
}