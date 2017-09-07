import { Component, Injector } from '@angular/core';

import { HostedElement }    from '../hosted.element';
import { ButtonControl }    from '../model/control/button.control';
import { ElementData }      from './element.data';

@Component({
    selector: 'form-button',
    templateUrl: './button.component.pug'
})
export class ButtonComponent extends HostedElement<ButtonControl> {

    constructor(
        elementData: ElementData,
        injector: Injector
    ) {
        super(elementData, injector);
    }

}