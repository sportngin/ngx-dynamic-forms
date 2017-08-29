import { Component, Injector } from '@angular/core';

import { ElementData }      from './element.data';
import { HostedElement }    from '../hosted.element';
import { ButtonControl }    from '../model/control/button.control';

@Component({
    selector: 'form-button',
    templateUrl: './button.component.pug'
})
export class ButtonComponent extends HostedElement<ButtonControl> {

    constructor(
        elementData: ElementData,
        injector: Injector
    ) {
        super(
            elementData,
            injector
        );
    }

}