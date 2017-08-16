import { Component, Inject, Injector } from '@angular/core';

import { ELEMENT_DATA, ElementData }    from '../elements/element.data';
import { HostedElement }                from '../hosted.element';

@Component({
    selector: 'field-display',
    templateUrl: 'field.display.component.pug'
})
export class FieldDisplayComponent extends HostedElement {

    constructor(
        @Inject(ELEMENT_DATA) elementData: ElementData,
        injector: Injector) {
        super(elementData, injector);
    }

}