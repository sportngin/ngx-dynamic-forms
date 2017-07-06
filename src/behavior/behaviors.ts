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

export interface SaveItemHandler {
    onSaveItemClick(form: AbstractControl): void;
}

export interface RemoveItemHandler {
    onRemoveItemClick(form: AbstractControl): void;
}

export interface ResetItemHandler {
    onResetItemClick(form: AbstractControl): void;
}

export interface IsDisabledHandler {
    isDisabled(form: AbstractControl): boolean;
}

export interface IsRenderedHandler {
    isChildRendered(form: AbstractControl, key?: string): boolean;
}

export interface IsListItemControlRenderedHandler {
    isListItemControlRendered(form: AbstractControl, key: string): boolean;
}

export interface DisplayValidationHandler {
    validateDisplay(form: AbstractControl, fieldKey: string, errorKey: string): boolean;
}

function getInjectionToken<T>(type: BehaviorType | string): InjectionToken<T> {
    return new InjectionToken<T>(`${type}BehaviorHandler`)
}

export function behavior<T>(type: BehaviorType | string, accessor: BehaviorFnAccessor<T>): Behavior {
    return { type, token: getInjectionToken<T>(type), accessor };
}

export const BUILT_IN_BEHAVIORS: Behavior[] = [
    behavior<DisplayValidationHandler>(BehaviorType.validateDisplay, h => h.validateDisplay),
    behavior<EditItemHandler>(BehaviorType.editItem, h => h.onEditItemClick),
    behavior<IsDisabledHandler>(BehaviorType.isDisabled, h => h.isDisabled),
    behavior<IsListItemControlRenderedHandler>(BehaviorType.isListItemControlRendered, h => h.isListItemControlRendered),
    behavior<IsRenderedHandler>(BehaviorType.isRendered, h => h.isChildRendered),
    behavior<RemoveItemHandler>(BehaviorType.removeItem, h => h.onRemoveItemClick),
    behavior<ResetItemHandler>(BehaviorType.resetItem, h => h.onResetItemClick),
    behavior<SaveItemHandler>(BehaviorType.saveItem, h => h.onSaveItemClick)
];

export const BUILT_IN_BEHAVIORS_MAP: { [key: string]: Behavior } = {};
for (let index = 0; index < BUILT_IN_BEHAVIORS.length; index++) {
    let b = BUILT_IN_BEHAVIORS[index];
    BUILT_IN_BEHAVIORS_MAP[b.type] = b;
}

export function behaviorProvider(implementation: Type<any>, type: BehaviorType): Provider {
    return { provide: BUILT_IN_BEHAVIORS_MAP[type].token, useExisting: implementation };
}

export function behaviorProviders(implementation: Type<any>, ...types: BehaviorType[]): Provider[] {
    let result = [];
    for (let index = 0; index < types.length; index++) {
        result.push(behaviorProvider(implementation, types[index]));
    }
    return result;
}