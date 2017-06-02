import { Component, Host, Injector, Input } from '@angular/core';
import { FormGroup }                        from '@angular/forms';

import { FormComponentHost }    from '../form.component.host';
import { FieldBase }            from './field.base';

@Component({
    selector: 'group-field',
    templateUrl: './group.field.pug'
})
export class GroupFieldComponent extends FieldBase<FormGroup> {

    @Input() public fieldForm: FormGroup;

    constructor(
        injector: Injector,
        @Host() host: FormComponentHost
    ) {
        super(injector, host);
    }

}