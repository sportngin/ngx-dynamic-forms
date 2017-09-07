import { InjectionToken, Provider, Type } from '@angular/core';
import { AbstractControl } from '@angular/forms';

export enum BehaviorType {
    editItem = 'editItem',
    isDisabled = 'isDisabled',
    isListItemControlRendered = 'isListItemControlRendered',
    isRendered = 'isRendered',
    removeItem = 'removeItem',
    resetItem = 'resetItem',
    saveItem = 'saveItem',
    stateMessageDisplay = 'stateMessageDisplay',
    submit = 'submit',
    validateDisplay = 'validateDisplay'
}

export type BehaviorFn = (form: AbstractControl, ...args: string[]) => any;

export type BehaviorFnAccessor<T> = (handler: T) => BehaviorFn;

export interface Behavior {

    type: BehaviorType | string,
    token: InjectionToken<any>;
    accessor: BehaviorFnAccessor<any>

}

export function behavior<T>(type: BehaviorType | string, token: InjectionToken<T>, accessor: BehaviorFnAccessor<T>): Behavior {
    return { type, token, accessor };
}

export interface EditItemHandler {
    onEditItemClick(form: AbstractControl): void;
}
export function editItemHandlerAccessor<T extends EditItemHandler>(implementation: T): BehaviorFn {
    return implementation.onEditItemClick;
}
export const EDIT_ITEM_HANDLER = new InjectionToken<EditItemHandler>(BehaviorType.editItem);

export interface SaveItemHandler {
    onSaveItemClick(form: AbstractControl): void;
}
export function saveItemHandlerAccessor<T extends SaveItemHandler>(implementation: T): BehaviorFn {
    return implementation.onSaveItemClick;
}
export const SAVE_ITEM_HANDLER = new InjectionToken<SaveItemHandler>(BehaviorType.saveItem);

export interface StateMessageDisplayHandler {
    showStateMessage(form: AbstractControl, key: string): boolean;
}
export function stateMessageDisplayHandlerAccessor<T extends StateMessageDisplayHandler>(implementation: T): BehaviorFn {
    return implementation.showStateMessage;
}
export const STATE_MESSAGE_DISPLAY_HANDLER = new InjectionToken<StateMessageDisplayHandler>(BehaviorType.stateMessageDisplay);

export interface SubmitHandler {
    onSubmit(form: AbstractControl): void;
}
export function submitHandlerAccessor<T extends SubmitHandler>(implementation: T): BehaviorFn {
    return implementation.onSubmit;
}
export const SUBMIT_HANDLER = new InjectionToken<SubmitHandler>(BehaviorType.submit);

export interface RemoveItemHandler {
    onRemoveItemClick(form: AbstractControl): void;
}
export function removeItemHandlerAccessor<T extends RemoveItemHandler>(implementation: T): BehaviorFn {
    return implementation.onRemoveItemClick;
}
export const REMOVE_ITEM_HANDLER = new InjectionToken<RemoveItemHandler>(BehaviorType.removeItem);

export interface ResetItemHandler {
    onResetItemClick(form: AbstractControl): void;
}
export function resetItemHandlerAccessor<T extends ResetItemHandler>(implementation: T): BehaviorFn {
    return implementation.onResetItemClick;
}
export const RESET_ITEM_HANDLER = new InjectionToken<ResetItemHandler>(BehaviorType.resetItem);

export interface IsDisabledHandler {
    isDisabled(form: AbstractControl): boolean;
}
export function isDisabledHandlerAccessor<T extends IsDisabledHandler>(implementation: T): BehaviorFn {
    return implementation.isDisabled;
}
export const IS_DISABLED_HANDLER = new InjectionToken<IsDisabledHandler>(BehaviorType.isDisabled);

export interface IsRenderedHandler {
    isChildRendered(form: AbstractControl, key?: string): boolean;
}
export function isRenderedHandlerAccessor<T extends IsRenderedHandler>(implementation: T): BehaviorFn {
    return implementation.isChildRendered;
}
export const IS_RENDERED_HANDLER = new InjectionToken<IsRenderedHandler>(BehaviorType.isRendered);

export interface IsListItemControlRenderedHandler {
    isListItemControlRendered(form: AbstractControl, key: string): boolean;
}
export function isListItemControlRenderedHandlerAccessor<T extends IsListItemControlRenderedHandler>(implementation: T): BehaviorFn {
    return implementation.isListItemControlRendered;
}
export const IS_LIST_ITEM_CONTROL_RENDERED_HANDLER = new InjectionToken<IsListItemControlRenderedHandler>(BehaviorType.isListItemControlRendered);

export interface DisplayValidationHandler {
    validateDisplay(form: AbstractControl, fieldKey: string, errorKey: string): boolean;
}
export function displayValidationHandlerAccessor<T extends DisplayValidationHandler>(implementation: T): BehaviorFn {
    return implementation.validateDisplay;
}
export const DISPLAY_VALIDATION_HANDLER = new InjectionToken<DisplayValidationHandler>(BehaviorType.validateDisplay);

export const BEHAVIOR_EDIT_ITEM = behavior<EditItemHandler>(BehaviorType.editItem, EDIT_ITEM_HANDLER, editItemHandlerAccessor);
export const BEHAVIOR_IS_DISABLED = behavior<IsDisabledHandler>(BehaviorType.isDisabled, IS_DISABLED_HANDLER, isDisabledHandlerAccessor);
export const BEHAVIOR_IS_LIST_ITEM_CONTROL_RENDERED = behavior<IsListItemControlRenderedHandler>(BehaviorType.isListItemControlRendered, IS_LIST_ITEM_CONTROL_RENDERED_HANDLER, isListItemControlRenderedHandlerAccessor);
export const BEHAVIOR_IS_RENDERED = behavior<IsRenderedHandler>(BehaviorType.isRendered, IS_RENDERED_HANDLER, isRenderedHandlerAccessor);
export const BEHAVIOR_REMOVE_ITEM = behavior<RemoveItemHandler>(BehaviorType.removeItem, REMOVE_ITEM_HANDLER, removeItemHandlerAccessor);
export const BEHAVIOR_RESET_ITEM = behavior<ResetItemHandler>(BehaviorType.resetItem, RESET_ITEM_HANDLER, resetItemHandlerAccessor);
export const BEHAVIOR_SAVE_ITEM = behavior<SaveItemHandler>(BehaviorType.saveItem, SAVE_ITEM_HANDLER, saveItemHandlerAccessor);
export const BEHAVIOR_STATE_MESSAGE_DISPLAY = behavior<StateMessageDisplayHandler>(BehaviorType.stateMessageDisplay, STATE_MESSAGE_DISPLAY_HANDLER, stateMessageDisplayHandlerAccessor);
export const BEHAVIOR_SUBMIT = behavior<SubmitHandler>(BehaviorType.submit, SUBMIT_HANDLER, submitHandlerAccessor);
export const BEHAVIOR_VALIDATE_DISPLAY = behavior<DisplayValidationHandler>(BehaviorType.validateDisplay, DISPLAY_VALIDATION_HANDLER, displayValidationHandlerAccessor);

export const BUILT_IN_BEHAVIORS: Behavior[] = [
    BEHAVIOR_EDIT_ITEM,
    BEHAVIOR_IS_DISABLED,
    BEHAVIOR_IS_LIST_ITEM_CONTROL_RENDERED,
    BEHAVIOR_IS_RENDERED,
    BEHAVIOR_REMOVE_ITEM,
    BEHAVIOR_RESET_ITEM,
    BEHAVIOR_SAVE_ITEM,
    BEHAVIOR_STATE_MESSAGE_DISPLAY,
    BEHAVIOR_SUBMIT,
    BEHAVIOR_VALIDATE_DISPLAY
];

export const BUILT_IN_BEHAVIORS_MAP: { [key: string]: Behavior } = {
    editItem: BEHAVIOR_EDIT_ITEM,
    isDisabled: BEHAVIOR_IS_DISABLED,
    isListItemControlRendered: BEHAVIOR_IS_LIST_ITEM_CONTROL_RENDERED,
    isRendered: BEHAVIOR_IS_RENDERED,
    removeItem: BEHAVIOR_REMOVE_ITEM,
    resetItem: BEHAVIOR_RESET_ITEM,
    saveItem: BEHAVIOR_SAVE_ITEM,
    stateMessageDisplay: BEHAVIOR_STATE_MESSAGE_DISPLAY,
    submit: BEHAVIOR_SUBMIT,
    validateDisplay: BEHAVIOR_VALIDATE_DISPLAY
};

export function behaviorProvider(implementation: Type<any>, type: BehaviorType): Provider {
    return { provide: BUILT_IN_BEHAVIORS_MAP[type].token, useExisting: implementation };
}