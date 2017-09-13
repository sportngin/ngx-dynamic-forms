import { Component, Injector } from '@angular/core';

import { ButtonElement }        from '../../model/element';
import { ElementData }          from '../element.data';
import { FormControlComponent } from '../form.control.component';

@Component({
    selector: 'form-button',
    templateUrl: './button.component.pug'
})
export class ButtonComponent extends FormControlComponent<ButtonElement> {

    constructor(
        elementData: ElementData,
        injector: Injector
    ) {
        super(elementData, injector);
    }

}