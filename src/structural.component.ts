import { Injector, Provider } from '@angular/core';

import { chain } from 'lodash';

import { ComponentInfo }    from './component.info';
import { ElementData }      from './elements/element.data';
import { MODEL_CONTROL_PROVIDER, ModelControl } from './model/control/model.control';
import { ParentComponent }  from './parent.component';

export abstract class StructuralComponent<TControl extends ModelControl = ModelControl> extends ParentComponent<TControl> {

    constructor(
        elementData: ElementData,
        protected childControls: ModelControl[],
        injector: Injector
    ) {
        super(elementData, injector);
    }

    private getProviders(control: ModelControl): Provider[] {
        return [
            { provide: ElementData, useValue: this.getElementData(control) },
            { provide: MODEL_CONTROL_PROVIDER, useValue: control }
        ];
    }

    public createComponents(): ComponentInfo[] {
        return chain(this.childControls)
            .map(childControl => this.createComponent(childControl, this.getComponentType(childControl), this.getProviders(childControl)))
            .flatten()
            .value() as ComponentInfo[];
    }
}