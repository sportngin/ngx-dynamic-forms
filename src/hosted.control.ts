import { Injector } from '@angular/core';

import { BehaviorService }      from './behavior/behavior.service';
import { FormComponentHost }    from './form.component.host';
import { HostedElement }        from './hosted.element';
import { ModelControl }         from './model/control/model.control';

export abstract class HostedControl extends HostedElement {

    protected abstract control: ModelControl;

    constructor(
        injector: Injector,
        host: FormComponentHost
    ) {
        super(injector, injector.get(BehaviorService), host);
    }

}