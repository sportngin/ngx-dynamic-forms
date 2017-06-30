import { Component, ElementRef, Injector, Input, Renderer2, OnInit } from '@angular/core';

import { FormComponentHost }    from './form.component.host';
import { HostedElement }        from './hosted.element';
import { LayoutControl }        from './model/control/layout.control';
import { ModelControl }         from './model/control/model.control';

@Component({
    selector: '[layout]',
    templateUrl: 'layout.pug'
})
export class LayoutComponent extends HostedElement implements OnInit {

    get childControls(): ModelControl[] { return this.control ? this.control.childControls : null; }

    @Input() control: LayoutControl;
    @Input() displayOnly: boolean = false;

    constructor(
        injector: Injector,
        host: FormComponentHost,
        private elementRef: ElementRef,
        private renderer: Renderer2
    ) {
        super(injector, host);
    }

    ngOnInit(): void {
        if (this.control && this.control.attributes) {
            Object.keys(this.control.attributes).forEach(name => {
                this.renderer.setAttribute(this.elementRef.nativeElement, name, this.control.attributes[name]);
            });
        }
    }
}