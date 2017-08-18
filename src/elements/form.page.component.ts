import { Component, Inject, Injector, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ELEMENT_DATA, ElementData } from './element.data';
import { HostedElement }        from '../hosted.element';
import { PageControl }          from '../model/control/page.control';
import { ModelControl }         from '../model/control/model.control';

@Component({
    selector: 'form-page',
    templateUrl: './form.page.component.pug'
})
export class FormPageComponent extends HostedElement {

    get childControls(): ModelControl[] { return this.control ? this.control.childControls : null; }

    @Input() public formGroup: FormGroup;
    @Input() public control: PageControl;
    @Input() public form: FormGroup;

    currentPage: number = 0;

    constructor(
        @Inject(ELEMENT_DATA) elementData: ElementData,
        injector: Injector
    ) {
        // FIXME: see above
        super(elementData, injector);
    }
}