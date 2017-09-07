import { Component, Injector, Input }   from '@angular/core';
import { FormGroup }                    from '@angular/forms';

import { FieldData }   from './field.data';
import { FieldBase }   from './field.base';

@Component({
    selector: 'group-field',
    templateUrl: './group.field.component.pug'
})
export class GroupFieldComponent extends FieldBase<FormGroup> {

    @Input() public fieldForm: FormGroup;

    constructor(
        elementData: FieldData,
        injector: Injector
    ) {
        super(elementData, injector);
    }

}