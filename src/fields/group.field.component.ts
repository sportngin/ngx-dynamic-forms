import { Component, Host, Inject, Injector, Input } from '@angular/core';
import { FormGroup }                        from '@angular/forms';

import { FormComponentHost }    from '../form.component.host';
import { FieldBase }            from './field.base';
import { ELEMENT_DATA_PROVIDER, ElementData } from './element.data';

@Component({
    selector: 'group-field',
    templateUrl: './group.field.pug'
})
export class GroupFieldComponent extends FieldBase<FormGroup> {

    @Input() public fieldForm: FormGroup;

    constructor(
        @Inject(ELEMENT_DATA_PROVIDER) elementData: ElementData,
        injector: Injector,
        @Host() host: FormComponentHost
    ) {
        super(elementData, injector, host);
    }

}