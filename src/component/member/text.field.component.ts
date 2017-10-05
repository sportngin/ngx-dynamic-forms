import { Component, Injector, ViewEncapsulation } from '@angular/core';

import { MemberType }           from '../../model/member';
import { FormMemberComponent }  from '../form.member.component';
import { MemberData }           from '../member.data';

@Component({
    selector: 'text-field',
    templateUrl: './text.field.component.pug',
    styleUrls: ['./text.field.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TextFieldComponent extends FormMemberComponent {

    public type: string;

    constructor(
        elementData: MemberData,
        injector: Injector
    ) {
        super(elementData, injector);

        if (this.element.memberType === MemberType.hidden) {
            this.type = 'hidden';
        } else {
            this.type = 'text';
        }
    }
}