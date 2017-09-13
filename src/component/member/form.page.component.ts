import { Component, Injector, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { PageMember }           from '../../model/member';
import { TEMPLATE }             from '../parent.component';
import { StructuralComponent }  from '../structural.component';
import { ElementData }          from '../element.data';

@Component({
    selector: 'form-page',
    template: TEMPLATE
})
export class FormPageComponent extends StructuralComponent<PageMember> {

    private getEmptyElementData(): ElementData {
        return {
            form: null,
            element: null
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
    @Input() set member(member: PageMember) {
        if (!this.elementData) {
            this.elementData = this.getEmptyElementData();
        }
        this.elementData.element = member;
        // this.children = member.children;
    }

    constructor(
        injector: Injector
    ) {
        super({ form: null, element: null }, null, injector);
    }
}