import { Component, Host, Inject, Injector, Input } from '@angular/core';
import { FormGroup }                        from '@angular/forms';

import { FormComponentHost }    from '../form.component.host';
import { FieldBase }            from './field.base';
import { FIELD_DATA_PROVIDER, FieldData } from './element.data';

@Component({
    selector: 'group-field',
    templateUrl: './group.field.pug'
})
export class GroupFieldComponent extends FieldBase<FormGroup> {

    @Input() public fieldForm: FormGroup;

    constructor(
        @Inject(FIELD_DATA_PROVIDER) elementData: FieldData,
        injector: Injector,
        @Host() host: FormComponentHost
    ) {
        super(elementData, injector, host);
    }

}