import { Component, Host, Injector, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';

import { FormComponentHost }    from '../form.component.host';
import { FormControlType }      from '../form.control.type';
import { ModelMember }          from '../model/member/model.member';
import { FieldBase }            from './field.base';

@Component({
    selector: 'text-field',
    templateUrl: './text.field.pug',
    styleUrls: ['./text.field.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TextFieldComponent extends FieldBase<FormControl> {

    public type: string;

    constructor(
        injector: Injector,
        @Host() host: FormComponentHost
    ) {
        super(injector, host);

        if ((this.control.member as ModelMember).controlType === FormControlType.hidden) {
            this.type = 'hidden';
        } else {
            this.type = 'text';
        }
    }
}