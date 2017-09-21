import { AbstractControl } from '@angular/forms';

import { extend, get } from 'lodash';

import { FormText, FormTextByState, FormTextByStateAndExists, FormTextFn, FormTextType } from '../model';
import { FormState } from './form.host.component';

function getFormTextType(text: FormText): FormTextType {
    if (text === null) {
        return FormTextType.string;
    }
    switch (typeof text) {
        case 'undefined':
        case 'string':
            return FormTextType.string;
        case 'function':
            return FormTextType.fn;
    }
    if (text.hasOwnProperty('exists')) {
        return FormTextType.byStateAndExists;
    }
    return FormTextType.byState;
}

export function mergeFormText(text: FormText): FormText {
    switch(getFormTextType(text)) {
        case FormTextType.string:
        case FormTextType.fn:
        case FormTextType.byState:
            return text;
    }

    let textByStateAndExists = text as FormTextByStateAndExists;
    let defaultTextType = getFormTextType(textByStateAndExists.default);
    let existsTextType = getFormTextType(textByStateAndExists.exists.text);
    if (existsTextType !== FormTextType.byState || defaultTextType !== FormTextType.byState) {
        return textByStateAndExists;
    }

    textByStateAndExists.exists.text = extend(
        textByStateAndExists.exists.text as FormTextByState,
        textByStateAndExists.default as FormTextByState,
        textByStateAndExists.exists.text as FormTextByState);

    return textByStateAndExists;
}

function getTextByState(form: AbstractControl, state: FormState, text: FormTextByState): string {

    if (!text) {
        return '';
    }
    if (!state) {
        return text.default;
    }

    if (state.error && text.error) {
        return text.error;
    }
    if (state.submitted && text.submitted) {
        return text.submitted;
    }
    if (state.submitting && text.submitting) {
        return text.submitting;
    }
    if (form.invalid && text.invalid) {
        return text.invalid;
    }
    if (form.dirty && text.dirty) {
        return text.dirty;
    }
    if (form.valid && text.valid) {
        return text.valid;
    }

    return text.default;
}

export function getText(form: AbstractControl, state: FormState, text: FormText): string {
    text = mergeFormText(text);
    let type = getFormTextType(text);

    if (type === FormTextType.string) {
        return (text as string) || '';
    }

    if (type === FormTextType.fn) {
        return (text as FormTextFn)(form, state);
    }

    if (type === FormTextType.byState) {
        return getTextByState(form, state, text as FormTextByState);
    }

    let textByStateAndExists = text as FormTextByStateAndExists;
    let exists = form.value && get(form.value, textByStateAndExists.exists.property);
    return getText(form, state, exists ? textByStateAndExists.exists.text : textByStateAndExists.default);
}