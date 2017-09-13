import { Component, Injector } from '@angular/core';

import { ModelMember }          from '../../model/member/model.member';
import { ElementData }          from '../element.data';
import { FormElementComponent } from '../form.element.component';

@Component({
    selector: 'member-display',
    templateUrl: 'member.display.component.pug'
})
export class MemberDisplayComponent extends FormElementComponent<ModelMember> {

    get displayValue(): string {
        if (!this.element.name) {
            return null;
        }
        let formControl = this.form.controls[this.element.name];
        if (!formControl) {
            return null;
        }
        if (formControl['displayValue']) {
            return formControl['displayValue'];
        }
        return this.form.value[this.element.name]
    }

    constructor(
        elementData: ElementData,
        injector: Injector) {
        super(elementData, injector);
    }


}