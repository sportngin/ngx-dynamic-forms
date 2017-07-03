import { AbstractControl } from '@angular/forms';

import { FormState } from './form.component.host';

export interface FormTextByState {

    default: string;
    valid?: string;
    invalid?: string;
    submitting?: string;
    submitted?: string;
    error?: string;

}

export interface FormTextByStateAndExists {
    default: FormTextByState;
    exists: {
        text: FormTextByState,
        property: string
    };
}

export type FormTextFn = (form: AbstractControl, formState: FormState) => string;

export type FormText =
    string |
    FormTextFn |
    FormTextByState |
    FormTextByStateAndExists;