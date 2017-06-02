import { Component, Host, Injector, Input } from '@angular/core';

import { FormComponentHost }    from './form.component.host';
import { HostedElement }        from './hosted.element';
import { LayoutControl }        from './model/control/layout.control';
import { ModelControl }         from './model/control/model.control';

@Component({
    selector: '[layout]',
    templateUrl: 'layout.pug'
})
export class LayoutComponent extends HostedElement {

    get childControls(): ModelControl[] { return this.control ? this.control.childControls : null; }

    @Input() control: LayoutControl;
    @Input() displayOnly: boolean = false;

    constructor(
        injector: Injector,
        // FIXME: for some reason, using this here causes a "No provider for FormComponentHost" error to be thrown
        // @Host() host: FormComponentHost
    ) {
        // FIXME: see above
        super(injector, (injector as any).view.component.host);
    }
}