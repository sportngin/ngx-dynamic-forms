import { Component, Injector, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { PageControl }          from '../model/control/page.control';
import { TEMPLATE }             from '../parent.component';
import { StructuralComponent }  from '../structural.component';
import { ElementData }          from './element.data';

@Component({
    selector: 'form-page',
    template: TEMPLATE
})
export class FormPageComponent extends StructuralComponent<PageControl> {

    private getEmptyElementData(): ElementData {
        return {
            form: null,
            control: null
        }
    }

    @Input() set form(form: FormGroup) {
        if (!this.elementData) {
            this.elementData = this.getEmptyElementData();
        }
        this.elementData.form = form;
    }
    get form(): FormGroup {
        return this.elementData.form;
    }
    @Input() set control(control: PageControl) {
        if (!this.elementData) {
            this.elementData = this.getEmptyElementData();
        }
        this.elementData.control = control;
        this.childControls = control.childControls;
    }

    constructor(
        injector: Injector
    ) {
        super({ form: null, control: null }, null, injector);
    }
}