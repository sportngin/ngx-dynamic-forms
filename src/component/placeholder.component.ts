import { Component, Inject, Injector, Optional, ViewEncapsulation } from '@angular/core';

import { ELEMENT_TIP, ModelElement, ModelElementTip } from '../model/element';
import { FormElementComponent } from './form.element.component';
import { ElementData }          from './element.data';

@Component({
    selector: 'placeholder',
    template: '',
    styleUrls: ['./placeholder.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PlaceholderComponent extends FormElementComponent {

    public get isPlaceholder(): boolean {
        return true;
    }

    constructor(
        elementData: ElementData,
        @Optional() @Inject(ELEMENT_TIP) private elementTip: ModelElementTip,
        injector: Injector
    ) {
        super(elementData, injector);
    }

    public get checkedElement(): ModelElement {
        return this.elementTip || this.elementData.element;
    }
}