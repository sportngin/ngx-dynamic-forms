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
    validateDisplay = 'validateDisplay'
}

export type BehaviorFn = (form: AbstractControl, ...args: string[]) => any;

export type BehaviorFnAccessor<T> = (handler: T) => BehaviorFn;

export interface Behavior {

    type: BehaviorType | string,
    token: InjectionToken<any>;
    accessor: BehaviorFnAccessor<any>

}

export interface EditItemHandler {
    onEditItemClick(form: AbstractControl): void;
}
export function editItemHandlerAccessor<T extends EditItemHandler>(implementation: T): BehaviorFn {
    return implementation.onEditItemClick;
}

export interface SaveItemHandler {
    onSaveItemClick(form: AbstractControl): void;
}
export function saveItemHandlerAccessor<T extends SaveItemHandler>(implementation: T): BehaviorFn {
    return implementation.onSaveItemClick;
}

export interface RemoveItemHandler {
    onRemoveItemClick(form: AbstractControl): void;
}
export function removeItemHandlerAccessor<T extends RemoveItemHandler>(implementation: T): BehaviorFn {
    return implementation.onRemoveItemClick;
}

export interface ResetItemHandler {
    onResetItemClick(form: AbstractControl): void;
}export function resetItemHandlerAccessor<T extends ResetItemHandler>(implementation: T): BehaviorFn {
    return implementation.onResetItemClick;
}

export interface IsDisabledHandler {
    isDisabled(form: AbstractControl): boolean;
}
export function isDisabledHandlerAccessor<T extends IsDisabledHandler>(implementation: T): BehaviorFn {
    return implementation.isDisabled;
}

export interface IsRenderedHandler {
    isChildRendered(form: AbstractControl, key?: string): boolean;
}
export function isRenderedHandlerAccessor<T extends IsRenderedHandler>(implementation: T): BehaviorFn {
    return implementation.isChildRendered;
}

export interface IsListItemControlRenderedHandler {
    isListItemControlRendered(form: AbstractControl, key: string): boolean;
}
export function isListItemControlRenderedHandlerAccessor<T extends IsListItemControlRenderedHandler>(implementation: T): BehaviorFn {
    return implementation.isListItemControlRendered;
}

export interface DisplayValidationHandler {
    validateDisplay(form: AbstractControl, fieldKey: string, errorKey: string): boolean;
}
export function displayValidationHandlerAccessor<T extends DisplayValidationHandler>(implementation: T): BehaviorFn {
    return implementation.validateDisplay;
}

export function getInjectionToken<T>(type: BehaviorType | string): InjectionToken<T> {
    return new InjectionToken<T>(`${type}BehaviorHandler`)
}

export function behavior<T>(type: BehaviorType | string, accessor: BehaviorFnAccessor<T>): Behavior {
    return { type, token: getInjectionToken<T>(type), accessor };
}

export const BEHAVIOR_EDIT_ITEM = behavior<EditItemHandler>(BehaviorType.editItem, editItemHandlerAccessor);
export const BEHAVIOR_IS_DISABLED = behavior<IsDisabledHandler>(BehaviorType.isDisabled, isDisabledHandlerAccessor);
export const BEHAVIOR_IS_LIST_ITEM_CONTROL_RENDERED = behavior<IsListItemControlRenderedHandler>(BehaviorType.isListItemControlRendered, isListItemControlRenderedHandlerAccessor);
export const BEHAVIOR_IS_RENDERED = behavior<IsRenderedHandler>(BehaviorType.isRendered, isRenderedHandlerAccessor);
export const BEHAVIOR_REMOVE_ITEM = behavior<RemoveItemHandler>(BehaviorType.removeItem, removeItemHandlerAccessor);
export const BEHAVIOR_RESET_ITEM = behavior<ResetItemHandler>(BehaviorType.resetItem, resetItemHandlerAccessor);
export const BEHAVIOR_SAVE_ITEM = behavior<SaveItemHandler>(BehaviorType.saveItem, saveItemHandlerAccessor);
export const BEHAVIOR_VALIDATE_DISPLAY = behavior<DisplayValidationHandler>(BehaviorType.validateDisplay, displayValidationHandlerAccessor);

export const BUILT_IN_BEHAVIORS: Behavior[] = [
    BEHAVIOR_EDIT_ITEM,
    BEHAVIOR_IS_DISABLED,
    BEHAVIOR_IS_LIST_ITEM_CONTROL_RENDERED,
    BEHAVIOR_IS_RENDERED,
    BEHAVIOR_REMOVE_ITEM,
    BEHAVIOR_RESET_ITEM,
    BEHAVIOR_SAVE_ITEM,
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
    validateDisplay: BEHAVIOR_VALIDATE_DISPLAY
};

export function behaviorProvider(implementation: Type<any>, type: BehaviorType): Provider {
    return { provide: BUILT_IN_BEHAVIORS_MAP[type].token, useExisting: implementation };
}