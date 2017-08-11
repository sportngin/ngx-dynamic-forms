import { Inject, Injector } from '@angular/core';

import { BehaviorService }      from './behavior/behavior.service';
import { FormComponentHost }    from './form.component.host';
import { HostedElement }        from './hosted.element';
import { ModelControl }         from './model/control/model.control';
import { ELEMENT_DATA_PROVIDER, ElementData } from './fields/element.data';

export abstract class ElementBase<TModelControl extends ModelControl = ModelControl> extends HostedElement {

    public get control(): TModelControl {
        return this.elementData.control as TModelControl;
    }

    constructor(
        @Inject(ELEMENT_DATA_PROVIDER) protected elementData: ElementData,
        injector: Injector,
        behaviorService: BehaviorService,
        host: FormComponentHost) {
        super(elementData.form, injector, behaviorService, host);
    }
}