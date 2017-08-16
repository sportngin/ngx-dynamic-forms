import {
    Component, ElementRef, Injector, Input, Renderer2, OnInit, ViewEncapsulation, Inject
} from '@angular/core';

import { ElementData, ELEMENT_DATA } from './element.data';
import { FormComponentHost }    from '../form.component.host';
import { HostedElement }        from '../hosted.element';
import { LayoutControl }        from '../model/control/layout.control';
import { ModelControl }         from '../model/control/model.control';

@Component({
    selector: 'layout',
    templateUrl: 'layout.pug',
    styleUrls: ['./layout.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class LayoutComponent extends HostedElement implements OnInit {

    get childControls(): ModelControl[] { return this.control ? this.control.childControls : null; }

    public control: LayoutControl;

    constructor(
        @Inject(ELEMENT_DATA) elementData: ElementData,
        injector: Injector,
        host: FormComponentHost,
        private elementRef: ElementRef,
        private renderer: Renderer2
    ) {
        super(elementData, injector, host);

        // this.control = control as LayoutControl;
    }

    ngOnInit(): void {
        if (this.control) {
            if (this.control.attributes) {
                Object.keys(this.control.attributes).forEach(name => {
                    this.renderer.setAttribute(this.elementRef.nativeElement, name, this.control.attributes[name]);
                });
            }
            this.control.cssClasses.forEach(cssClass => this.renderer.addClass(this.elementRef.nativeElement, cssClass));
        }
    }
}