import { Component, Inject, Injector, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';

import { FieldType }            from '../field.type';
import { ModelMember }          from '../model/member/model.member';
import { FieldBase }            from './field.base';
import { FIELD_DATA_PROVIDER, FieldData } from './element.data';

@Component({
    selector: 'text-field',
    templateUrl: './text.field.pug',
    styleUrls: ['./text.field.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TextFieldComponent extends FieldBase<FormControl> {

    public type: string;

    constructor(
        @Inject(FIELD_DATA_PROVIDER) elementData: FieldData,
        injector: Injector
    ) {
        super(elementData, injector);

        if ((this.control.member as ModelMember).fieldType === FieldType.hidden) {
            this.type = 'hidden';
        } else {
            this.type = 'text';
        }
    }
}