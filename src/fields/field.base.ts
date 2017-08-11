import { Injector } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

import { BehaviorService }      from '../behavior/behavior.service';
import { ElementBase }          from '../element.base';
import { FormComponentHost }    from '../form.component.host';
import { ModelControl }         from '../model/control/model.control';
import { ElementData }          from './element.data';

export abstract class FieldBase<
    TControl extends AbstractControl = FormControl,
    TModelControl extends ModelControl = ModelControl
    > extends ElementBase<TModelControl> {

    public get formControl(): TControl {
        return this.elementData.formControl as TControl;
    }

    constructor(
        elementData: ElementData,
        injector: Injector,
        host: FormComponentHost) {
        super(elementData, injector, injector.get(BehaviorService), host);

        this.host = host;
        this.state = host.state;
    }
}
