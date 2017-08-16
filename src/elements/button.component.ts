import { Component, Inject, Injector } from '@angular/core';

import { ELEMENT_DATA, ElementData } from './element.data';
import { FormComponentHost }        from '../form.component.host';
import { HostedElement }            from '../hosted.element';
import { ButtonControl }            from '../model/control/button.control';

@Component({
    selector: 'form-button',
    templateUrl: './button.pug'
})
export class ButtonComponent extends HostedElement<ButtonControl> {

    constructor(
        @Inject(ELEMENT_DATA) elementData: ElementData,
        injector: Injector,
        host: FormComponentHost) {
        super(
            elementData,
            injector,
            host
        );
    }

}