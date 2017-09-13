import { AbstractControl } from '@angular/forms';


import { FormState } from '../component';

export enum FormTextType {
    string,
    fn,
    byState,
    byStateAndExists
}

export interface FormTextByState {

    default: string;
    valid?: string;
    invalid?: string;
    submitting?: string;
    submitted?: string;
    error?: string;

}

export interface FormTextByStateAndExists {
    default: string | FormTextFn | FormTextByState;
    exists: {
        text: string | FormTextFn | FormTextByState,
        property: string
    };
}

export type FormTextFn = (form: AbstractControl, formState: FormState) => string;

export type FormText =
    string |
    FormTextFn |
    FormTextByState |
    FormTextByStateAndExists;
