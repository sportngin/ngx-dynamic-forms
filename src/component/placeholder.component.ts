import { Component, Inject, Injector, Optional } from '@angular/core';

import { ELEMENT_TIP, ModelElement, ModelElementTip } from '../model/element';
import { FormElementComponent } from './form.element.component';
import { ElementData }          from './element.data';

@Component({
    selector: 'placeholder',
    template: ''
})
export class PlaceholderComponent extends FormElementComponent {

    public get isPlaceholder(): boolean {
        return true;
    }

    constructor(
        elementData: ElementData,
        @Optional() @Inject(ELEMENT_TIP) private elementHelper: ModelElementTip,
        injector: Injector
    ) {
        super(elementData, injector);
    }

    public get checkedElement(): ModelElement {
        return this.elementHelper || this.elementData.element;
    }
}