import { Injector, Provider } from '@angular/core';

import { map } from 'lodash';

import { ModelControl, MODEL_CONTROL, ModelElement } from '../model/element';
import { ComponentInfo }    from './component.info';
import { ElementData }      from './element.data';
import { ParentComponent }  from './parent.component';

export abstract class StructuralComponent<TModelControl extends ModelControl = ModelControl> extends ParentComponent<TModelControl> {

    constructor(
        elementData: ElementData,
        protected children: ModelElement[],
        injector: Injector
    ) {
        super(elementData, injector);
    }

    private getProviders(element: ModelElement): Provider[] {
        return [
            { provide: ElementData, useValue: this.getElementData(element) },
            { provide: MODEL_CONTROL, useValue: element }
        ];
    }

    public createChildComponents(): ComponentInfo[] {
        return map(this.children, child =>
            this.createComponent(child, this.getComponentType(child), this.getProviders(child)));
    }
}