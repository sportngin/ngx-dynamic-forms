import { Component, Host, Injector, Input } from '@angular/core';
import { FormGroup }                        from '@angular/forms';

import { FormComponentHost }    from './form.component.host';
import { HostedElement }        from './hosted.element';
import { PageControl }          from './model/control/page.control';
import { ModelControl }         from './model/control/model.control';
import { ModelElementTypes } from './model/model.element';

@Component({
    selector: 'form-page',
    templateUrl: './form.page.pug'
})
export class FormPageComponent extends HostedElement {

    get childControls(): ModelControl[] { return this.control ? this.control.childControls : null; }

    @Input() formGroup: FormGroup;
    @Input() control: PageControl;

    currentPage: number = 0;

    constructor(
        injector: Injector,
        // FIXME: for some reason, using this here causes a "No provider for FormComponentHost" error to be thrown
        // @Host() host: FormComponentHost
    ) {
        // FIXME: see above
        super(injector, (injector as any).view.component.host);
    }
}