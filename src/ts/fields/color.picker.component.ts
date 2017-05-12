import { Component, Host, Injector }    from '@angular/core';
import { FormControl }                  from '@angular/forms';

import { FormComponentHost }    from '../form.component.host';
import { FieldBase }            from './field.base';

@Component({
    selector: 'color-picker',
    templateUrl: './color.picker.pug'
})
export class ColorPickerComponent extends FieldBase<FormControl> {

    constructor(
        injector: Injector,
        @Host() host: FormComponentHost
    ) {
        super(injector, host);
    }

    get value(): string {
        return this.formControl.value;
    }

    set value(color: string) {
        this.formControl.setValue(color);
    }

}