import { Component, Injector } from '@angular/core';

import { ModelMember }          from '../../model/member/model.member';
import { ElementData }          from '../element.data';
import { FormElementComponent } from '../form.element.component';

@Component({
    selector: 'member-label',
    templateUrl: 'member.label.component.pug'
})
export class MemberLabelComponent extends FormElementComponent<ModelMember> {

    constructor(
        elementData: ElementData,
        injector: Injector) {
        super(elementData, injector);
    }


}