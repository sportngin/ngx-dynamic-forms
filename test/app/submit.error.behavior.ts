import { InjectionToken } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { Behavior, BehaviorFn } from '@siplay/ng-dynamic-forms';

export interface SubmitErrorHandler {
    submitError(form: AbstractControl, key: string): void;
}
export function SubmitErrorHandlerAccessor<T extends SubmitErrorHandler>(implementation: T): BehaviorFn {
    return implementation.submitError;
}
export const SUBMIT_ERROR_HANDLER = new InjectionToken<SubmitErrorHandler>('SubmitErrorHandler');

export const SUBMIT_ERROR_BEHAVIOR: Behavior = {
    type: 'submitError',
    token: SUBMIT_ERROR_HANDLER,
    accessor: SubmitErrorHandlerAccessor
};