import { Component, Host, Inject, Injector, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';

import { FormComponentHost }    from '../form.component.host';
import { FieldType }            from '../field.type';
import { ModelMember }          from '../model/member/model.member';
import { FieldBase }            from './field.base';
import { ELEMENT_DATA_PROVIDER, ElementData } from './element.data';

@Component({
    selector: 'text-field',
    templateUrl: './text.field.pug',
    styleUrls: ['./text.field.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TextFieldComponent extends FieldBase<FormControl> {

    public type: string;

    constructor(
        @Inject(ELEMENT_DATA_PROVIDER) elementData: ElementData,
        injector: Injector,
        @Host() host: FormComponentHost
    ) {
        super(elementData, injector, host);

        if ((this.control.member as ModelMember).fieldType === FieldType.hidden) {
            this.type = 'hidden';
        } else {
            this.type = 'text';
        }
    }
}