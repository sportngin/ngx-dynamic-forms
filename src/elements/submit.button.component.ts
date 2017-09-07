import { Component, Injector } from '@angular/core';

import { HostedElement }    from '../hosted.element';
import { ButtonControl }    from '../model/control/button.control';
import { ElementData }      from './element.data';

@Component({
    selector: 'submit-button',
    templateUrl: './submit.button.component.pug'
})
export class SubmitButtonComponent extends HostedElement<ButtonControl> {

    constructor(
        elementData: ElementData,
        injector: Injector
    ) {
        super(elementData, injector);

        console.log('SubmitButtonComponent.ctr', elementData);
    }

}