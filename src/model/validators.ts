import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

import { DateTime, Duration } from 'luxon';

export function minDateDiff(duration: Duration, nowFn: () => number = () => DateTime.utc().valueOf()): ValidatorFn {
    return function validate(control: AbstractControl): ValidationErrors | null {
        let now = DateTime.fromMillis(nowFn());
        let value = DateTime.fromMillis(control.value);
        if (value.plus(duration) <= now) {
            // valid!
            return null;
        }
        return {
            // TODO: better error message
            minDateDiff: duration.toISO()
        };
    }
}

// TODO: figure out how to write call signature so callers don't get "cannot invoke an expression whose type lacks a call signature" error
export const SIPValidators: { [name: string]: ValidatorFn | ((...args: any[]) => ValidatorFn) } = {
    minDateDiff
};
