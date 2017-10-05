import { Component, Injector } from '@angular/core';

import { ModelElement }         from '../model/element';
import { FormElementComponent } from './form.element.component';
import { ElementData }          from './element.data';

@Component({
    selector: 'ng-container[placeholder]',
    template: ''
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