import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

import * as moment from 'moment';

export function minDateDiff(duration: moment.Duration, nowFn: any = () => moment()): ValidatorFn {
    return function validate(control: AbstractControl): ValidationErrors | null {
        let now = moment(nowFn());
        let value = moment(control.value);
        if (moment.duration(now.diff(value)) >= duration) {
            // valid!
            return null;
        }
        return {
            // TODO: better error message
            minDateDiff: duration.toISOString()
        };
    }
}

// TODO: figure out how to write call signature so callers don't get "cannot invoke an expression whose type lacks a call signature" error
export const SIPValidators: { [name: string]: ValidatorFn | ((...args: any[]) => ValidatorFn) } = {
    minDateDiff
};