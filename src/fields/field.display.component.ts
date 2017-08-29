import { Component, Inject, Injector } from '@angular/core';

import { ElementData }    from '../elements/element.data';
import { HostedElement }                from '../hosted.element';

@Component({
    selector: 'field-display',
    templateUrl: 'field.display.component.pug'
})
export class FieldDisplayComponent extends HostedElement {

    constructor(
        elementData: ElementData,
        injector: Injector) {
        super(elementData, injector);
    }

}