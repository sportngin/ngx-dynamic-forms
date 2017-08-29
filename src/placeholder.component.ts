import { Component, Inject, Injector, Optional } from '@angular/core';

import { ElementData }                      from './elements/element.data';
import { HostedElement }                    from './hosted.element';
import { ModelControl }                     from './model/control/model.control';
import { ELEMENT_HELPER, ElementHelper }    from './model/model.element';

@Component({
    selector: 'placeholder',
    template: ''
})
export class PlaceholderComponent extends HostedElement {

    protected get isPlaceholder(): boolean {
        return true;
    }

    constructor(
        elementData: ElementData,
        @Optional() @Inject(ELEMENT_HELPER) private elementHelper: ElementHelper,
        injector: Injector
    ) {
        super(elementData, injector);
    }

    protected get checkedControl(): ModelControl | ElementHelper {
        return this.elementHelper || this.elementData.control;
    }
}