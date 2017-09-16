import { Component, Injector, OnInit, ViewEncapsulation } from '@angular/core';

import { LayoutControl }        from '../../model/element/layout.control';
import { ElementData }          from '../element.data';
import { TEMPLATE }             from '../parent.component';
import { StructuralComponent }  from '../structural.component';

@Component({
    selector: 'layout',
    template: TEMPLATE,
    styleUrls: ['./layout.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class LayoutComponent extends StructuralComponent<LayoutControl> implements OnInit {

    constructor(
        elementData: ElementData,
        injector: Injector
    ) {
        super(elementData, (elementData.element as LayoutControl).children, injector);
    }

    ngOnInit(): void {
        if (this.element) {
            if (this.element.attributes) {
                Object.keys(this.element.attributes).forEach(name => {
                    this.setAttribute(name, this.element.attributes[name]);
                });
            }
            this.addCssClass(...this.element.cssClasses);
        }
    }
}