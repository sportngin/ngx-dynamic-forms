import { Component, Injector, ViewEncapsulation } from '@angular/core';

import { ModelElement } from '../model/element';
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
        injector: Injector
    ) {
        super(elementData, injector);
    }

    public get checkedElement(): ModelElement {
        return this.element;
    }
}