import { Component, Injector, Input, OnInit, ViewEncapsulation } from '@angular/core';

import { FormMemberComponent }  from '../form.member.component';
import { MemberData }           from '../member.data';

@Component({
    selector: 'checkbox-field',
    templateUrl: 'checkbox.field.component.pug',
    styleUrls: ['./checkbox.field.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CheckboxFieldComponent extends FormMemberComponent implements OnInit {

    @Input() protected checked: boolean | (() => boolean);

    constructor(
        elementData: MemberData,
        injector: Injector
    ) {
        super(elementData, injector);
    }

    ngOnInit(): void {
        let checked = false;

        if (typeof(this.checked) === 'boolean') {
            checked = this.checked;
        } else if (typeof(this.checked) === 'function') {
            checked = this.checked();
        }
        setTimeout(() => this.formControl.setValue(checked || false), 0);
    }

    toggle(): void {
        this.formControl.setValue(!this.formControl.value);
    }
}