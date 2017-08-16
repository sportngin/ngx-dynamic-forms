import { Component, Inject, Injector } from '@angular/core';

import { ELEMENT_DATA, ElementData } from '../elements/element.data';
import { HostedElement }        from '../hosted.element';
import { FormComponentHost }    from '../form.component.host';

@Component({
    selector: 'field-display',
    templateUrl: 'field.display.pug'
})
export class FieldDisplayComponent extends HostedElement {

    constructor(
        @Inject(ELEMENT_DATA) elementData: ElementData,
        injector: Injector,
        host: FormComponentHost) {
        super(elementData, injector, host);
    }

}