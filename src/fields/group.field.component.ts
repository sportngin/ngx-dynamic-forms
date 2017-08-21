import { Component, Inject, Injector, Input }   from '@angular/core';
import { FormGroup }                            from '@angular/forms';

import { FIELD_DATA, FieldData }   from './element.data';
import { FieldBase }                        from './field.base';

@Component({
    selector: 'group-field',
    templateUrl: './group.field.component.pug'
})
export class GroupFieldComponent extends FieldBase<FormGroup> {

    @Input() public fieldForm: FormGroup;

    constructor(
        @Inject(FIELD_DATA) elementData: FieldData,
        injector: Injector
    ) {
        super(elementData, injector);
    }

}