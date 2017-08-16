import { Component, Host, Inject, Injector, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ELEMENT_DATA, ElementData } from './element.data';
import { FormComponentHost }    from '../form.component.host';
import { HostedElement }        from '../hosted.element';
import { PageControl }          from '../model/control/page.control';
import { ModelControl }         from '../model/control/model.control';

@Component({
    selector: 'form-page',
    templateUrl: './form.page.pug'
})
export class FormPageComponent extends HostedElement {

    get childControls(): ModelControl[] { return this.control ? this.control.childControls : null; }

    @Input() formGroup: FormGroup;
    @Input() control: PageControl;
    @Input() set form(form: FormGroup) {
        this.form = form;
    }

    currentPage: number = 0;

    constructor(
        @Inject(ELEMENT_DATA) elementData: ElementData,
        injector: Injector,
        // FIXME: for some reason, using this here causes a "No provider for FormComponentHost" error to be thrown
        // @Host() host: FormComponentHost
    ) {
        // FIXME: see above
        super(elementData, injector, (injector as any).view.component.host);
    }
}