import { Injector } from '@angular/core';

import { FormComponentHost, FormState } from './form.component.host';
import { FormElement }                  from './form.element';
import { ModelControl }                 from './model/control/model.control';
import { FormText, FormTextByState, FormTextByStateAndExists } from './form.text';

export abstract class HostedElement extends FormElement {

    public state: FormState;
    protected host: FormComponentHost;
    protected abstract control: ModelControl;

    constructor(
        injector: Injector,
        host: FormComponentHost
    ) {
        super(injector);

        if (host) {
            this.host = host;
            this.state = host.state;
        }
    }

    private getTextByState(text: FormTextByState): string {

        if (this.state.error && text.error) {
            return text.error;
        }
        if (this.state.submitted && text.submitted) {
            return text.submitted;
        }
        if (this.state.submitting && text.submitting) {
            return text.submitting;
        }
        if (this.form.valid && text.valid) {
            return text.valid;
        }
        if (this.form.invalid && text.invalid) {
            return text.invalid;
        }

        return text.default;
    }

    getText(text: FormText): string {
        if (typeof text === 'undefined' || text === null) {
            return '';
        }
        if (typeof text === 'string') {
            return text;
        }
        if (typeof text === 'function') {
            return text(this.form, this.state);
        }
        let textByState = text as (FormTextByState | FormTextByStateAndExists);
        if (typeof textByState.default === 'string') {
            return this.getTextByState(textByState as FormTextByState);
        }
        let textByStateAndExists = textByState as FormTextByStateAndExists;
        let exists = this.form.value && this.form.value[textByStateAndExists.exists.property];

        return this.getTextByState(exists ? textByStateAndExists.exists.text : textByStateAndExists.default);
    }

}