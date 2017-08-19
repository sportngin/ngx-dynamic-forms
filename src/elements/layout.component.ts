import { Component, Injector, OnInit, Inject } from '@angular/core';

import { LayoutControl }                from '../model/control/layout.control';
import { TEMPLATE }                     from '../parent.component';
import { StructuralComponent }          from '../structural.component';
import { ElementData, ELEMENT_DATA }    from './element.data';

@Component({
    selector: 'layout',
    template: TEMPLATE
})
export class LayoutComponent extends StructuralComponent<LayoutControl> implements OnInit {

    constructor(
        @Inject(ELEMENT_DATA) elementData: ElementData,
        injector: Injector
    ) {
        super(elementData, elementData.control.childControls, injector);
    }

    ngOnInit(): void {
        if (this.control) {
            if (this.control.attributes) {
                Object.keys(this.control.attributes).forEach(name => {
                    this.setAttribute(name, this.control.attributes[name]);
                });
            }
            this.addCssClass(...this.control.cssClasses);
        }
    }
}