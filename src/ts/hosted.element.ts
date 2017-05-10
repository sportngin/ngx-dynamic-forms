import { Injector } from '@angular/core';

import { FormComponentHost, FormState } from './form.component.host';
import { FormElement }                  from './form.element';
import { ModelControl }                 from './model/control/model.control';

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

}