import { Component, Injector, Input }   from '@angular/core';
import { FormGroup }                    from '@angular/forms';

import { FormMemberComponent }  from '../form.member.component';
import { MemberData }           from '../member.data';

@Component({
    selector: 'group-field',
    template: ''
})
export class GroupFieldComponent extends FormMemberComponent<FormGroup> {

    @Input() public fieldForm: FormGroup;

    constructor(
        elementData: MemberData,
        injector: Injector
    ) {
        super(elementData, injector);
    }

}