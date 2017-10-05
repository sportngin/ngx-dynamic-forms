import { Component, Injector, OnInit, ViewEncapsulation } from '@angular/core';

import { InlineElement }        from '../../model/element/inline.element';
import { FormElementComponent } from '../form.element.component';
import { ElementData }          from '../element.data';
@Component({
    selector: 'inline-element',
    template: '',
    styleUrls: ['./inline.element.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class InlineElementComponent extends FormElementComponent<InlineElement> implements OnInit {

    constructor(
        elementData: ElementData,
        injector: Injector
    ) {
        super(elementData, injector);
    }

    ngOnInit(): void {
        if (this.element.text) {
            this.elementRef.nativeElement.insertAdjacentText('afterbegin', this.element.text);
        }
    }

}