import { InjectionToken, OpaqueToken }  from '@angular/core';
import { AbstractControl }              from '@angular/forms';

export interface EditItemHandler {
    onEditItemClick(form: AbstractControl): void;
}

export const EditItemHandlerToken = new InjectionToken<EditItemHandler>('EditItemHandler');

export interface SaveItemHandler {
    onSaveItemClick(form: AbstractControl): void;
}

export const SaveItemHandlerToken = new InjectionToken<SaveItemHandler>('SaveItemHandler');

export interface RemoveItemHandler {
    onRemoveItemClick(form: AbstractControl): void;
}

export const RemoveItemHandlerToken = new InjectionToken<RemoveItemHandler>('RemoveItemHandler');

export interface ResetItemHandler {
    onResetItemClick(form: AbstractControl): void;
}

export const ResetItemHandlerToken = new InjectionToken<ResetItemHandler>('ResetItemHandler');

export interface IsDisabledHandler {
    isDisabled(form: AbstractControl): boolean;
}

export const IsDisabledHandlerToken = new InjectionToken<IsDisabledHandler>('IsDisabledHandler');

export interface UseAltTextHandler {
    useAltText(form: AbstractControl): boolean;
}

export const UseAltTextHandlerToken = new InjectionToken<UseAltTextHandler>('UseAltTextHandler');

export interface IsRenderedHandler {
    isChildRendered(form: AbstractControl, key?: string): boolean;
}

export const IsRenderedHandlerToken = new InjectionToken<IsRenderedHandler>('IsRenderedHandler');

// FIXME: these constants should be turned into a service so handlers for custom actions can be registered
export const HandlerTokens: { [key: string]: OpaqueToken } = {
    editItem: EditItemHandlerToken,
    isDisabled: IsDisabledHandlerToken,
    isRendered: IsRenderedHandlerToken,
    removeItem: RemoveItemHandlerToken,
    resetItem: ResetItemHandlerToken,
    saveItem: SaveItemHandlerToken,
    useAltText: UseAltTextHandlerToken
};

export const HandlerMethods: { [key: string]: string } = {
    editItem: 'onEditItemClick',
    isDisabled: 'isDisabled',
    isRendered: 'isChildRendered',
    removeItem: 'onRemoveItemClick',
    resetItem: 'onResetItemClick',
    saveItem: 'onSaveItemClick',
    useAltText: 'useAltText'
};