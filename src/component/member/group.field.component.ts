import { Component, Injector, Input }   from '@angular/core';
import { FormGroup }                    from '@angular/forms';

import { SimpleMember }         from '../../model/member';
import { FormMemberComponent }  from '../form.member.component';
import { MemberData }           from '../member.data';

@Component({
    selector: 'group-field',
    template: ''
})
export class GroupFieldComponent extends FormMemberComponent<SimpleMember, FormGroup> {

    @Input() public fieldForm: FormGroup;

    constructor(
        elementData: MemberData,
        injector: Injector
    ) {
        super(elementData, injector);
    }

}