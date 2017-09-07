import { Component, Injector } from '@angular/core';

import { ComponentInfo }            from '../component.info';
import { ControlSelectorComponent } from '../control.selector.component';
import { TEMPLATE }                 from '../parent.component';
import { ButtonControl }            from '../model/control/button.control';
import { ButtonTypeMappings }       from './button.type.mappings';
import { ElementData }              from './element.data';

@Component({
    selector: 'dynamic-button',
    template: TEMPLATE
})
export class ButtonSelectorComponent extends ControlSelectorComponent<ButtonControl> {

    constructor(
        elementData: ElementData,
        injector: Injector,
        private buttonTypeMappings: ButtonTypeMappings
    ) {
        super(elementData, injector);
    }

    protected createComponents(): ComponentInfo[] {
        return this.createComponent(
            this.control,
            this.buttonTypeMappings.getComponentType(this.control.buttonType),
            [{ provide: ElementData, useValue: this.elementData }]
        );
    }
}