import {
    Component, ElementRef, Injector, Renderer2, OnInit, ViewEncapsulation, Inject, ViewChild, ViewContainerRef
} from '@angular/core';

import { ElementData, ELEMENT_DATA } from './element.data';
import { HostedElement }        from '../hosted.element';
import { LayoutControl }        from '../model/control/layout.control';
import { ModelControl }         from '../model/control/model.control';
import { VIEW_CONTAINER_ACCESSOR, ViewContainerAccessor } from '../view.container.accessor';

@Component({
    selector: 'layout',
    templateUrl: 'layout.pug',
    styleUrls: ['./layout.component.scss'],
    encapsulation: ViewEncapsulation.None,
    viewProviders: [
        { provide: VIEW_CONTAINER_ACCESSOR, useExisting: LayoutComponent }
    ]
})
export class LayoutComponent extends HostedElement implements OnInit, ViewContainerAccessor {

    @ViewChild('container', { read: ViewContainerRef }) public container: ViewContainerRef;

    get childControls(): ModelControl[] { return this.control ? this.control.childControls : null; }

    public control: LayoutControl;

    constructor(
        @Inject(ELEMENT_DATA) elementData: ElementData,
        injector: Injector,
        private elementRef: ElementRef,
        private renderer: Renderer2
    ) {
        super(elementData, injector);

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