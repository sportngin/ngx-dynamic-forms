import { Component, Injector, OnInit, ViewEncapsulation } from '@angular/core';

import { LayoutControl }        from '../model/control/layout.control';
import { TEMPLATE }             from '../parent.component';
import { StructuralComponent }  from '../structural.component';
import { ElementData }          from './element.data';

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