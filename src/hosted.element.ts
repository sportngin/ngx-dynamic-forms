import { Injector } from '@angular/core';

import { BehaviorService }              from './behavior/behavior.service';
import { FormComponentHost, FormState } from './form.component.host';
import { FormElement }                  from './form.element';
import { FormText, getText }            from './form.text';
import { DisableBehavior }              from './model/disable.behavior';
import { FormGroup } from '@angular/forms';

export abstract class HostedElement extends FormElement {

    public state: FormState;
    protected host: FormComponentHost;

    constructor(
        form: FormGroup,
        injector: Injector,
        behaviorService: BehaviorService,
        host: FormComponentHost
    ) {
        super(form, injector, behaviorService);

        if (host) {
            this.host = host;
            this.state = host.state;
        }
    }

    getText(text: FormText): string {
        return getText(this.form, this.state, text);
    }

    public isDisabled(control: any): boolean {
        if (!control.constructor.prototype.hasOwnProperty('disableWhenInvalid')) {
            return false;
        }
        let disableBehavior = control as DisableBehavior;
        return disableBehavior.customDisabledHandler ?
            this.handleBehavior('isDisabled', this.form) :
            (disableBehavior.disableWhenInvalid && (!this.form.valid || this.state.submitting))
    }

}