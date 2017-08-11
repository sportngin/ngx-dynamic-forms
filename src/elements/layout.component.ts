import {
    Component, ElementRef, Injector, Input, Renderer2, OnInit, ViewEncapsulation, Inject
} from '@angular/core';
import { FormGroup } from '@angular/forms';

import { BehaviorService }      from '../behavior/behavior.service';
import { FormComponentHost }    from '../form.component.host';
import { HostedElement }        from '../hosted.element';
import { LayoutControl }        from '../model/control/layout.control';
import { MODEL_CONTROL_PROVIDER, ModelControl } from '../model/control/model.control';

@Component({
    selector: 'layout',
    templateUrl: 'layout.pug',
    styleUrls: ['./layout.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class LayoutComponent extends HostedElement implements OnInit {

    get childControls(): ModelControl[] { return this.control ? this.control.childControls : null; }

    @Input() displayOnly: boolean = false;

    public control: LayoutControl;

    constructor(
        form: FormGroup,
        injector: Injector,
        behaviorService: BehaviorService,
        host: FormComponentHost,
        private elementRef: ElementRef,
        private renderer: Renderer2,
        @Inject(MODEL_CONTROL_PROVIDER) control: ModelControl
    ) {
        super(form, injector, behaviorService, host);

        this.control = control as LayoutControl;

        console.log('LayoutComponent control', control);

    }

    ngOnInit(): void {
        if (this.control && this.control.attributes) {
            Object.keys(this.control.attributes).forEach(name => {
                this.renderer.setAttribute(this.elementRef.nativeElement, name, this.control.attributes[name]);
            });
        }

        console.log('LayoutComponent.ngOnInit this.control', this.control);
    }
}