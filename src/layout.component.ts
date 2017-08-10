import { Component, ElementRef, Injector, Input, Renderer2, OnInit, ViewEncapsulation } from '@angular/core';

import { BehaviorService }      from './behavior/behavior.service';
import { FormComponentHost }    from './form.component.host';
import { HostedElement }        from './hosted.element';
import { LayoutControl }        from './model/control/layout.control';
import { ModelControl }         from './model/control/model.control';

@Component({
    selector: 'layout',
    templateUrl: 'layout.pug',
    styleUrls: ['./layout.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class LayoutComponent extends HostedElement implements OnInit {

    get childControls(): ModelControl[] { return this.control ? this.control.childControls : null; }

    @Input() control: LayoutControl;
    @Input() displayOnly: boolean = false;

    constructor(
        injector: Injector,
        behaviorService: BehaviorService,
        host: FormComponentHost,
        private elementRef: ElementRef,
        private renderer: Renderer2
    ) {
        super(injector, behaviorService, host);
    }

    ngOnInit(): void {
        if (this.control && this.control.attributes) {
            Object.keys(this.control.attributes).forEach(name => {
                this.renderer.setAttribute(this.elementRef.nativeElement, name, this.control.attributes[name]);
            });
        }
    }
}