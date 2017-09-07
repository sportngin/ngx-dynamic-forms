import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';

import { FieldBase }   from './field.base';
import { FieldData }   from './field.data';

@Component({
    selector: 'color-picker',
    templateUrl: './color.picker.component.pug',
    styleUrls: ['./color.picker.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ColorPickerComponent extends FieldBase<FormControl> {

    constructor(
        elementData: FieldData,
        injector: Injector
    ) {
        super(elementData, injector);
    }

    get value(): string {
        return this.formControl.value;
    }

    set value(color: string) {
        setTimeout(() => this.formControl.setValue(color));
    }

    onToggleChange(toggled: boolean): void {
        if (toggled) {
            this.addCssClass('ngdf-colorpicker-toggled');
        } else {
            this.removeCssClass('ngdf-colorpicker-toggled');
        }
    }

    onChange(): void {
        this.formControl.markAsDirty();
        this.formControl.markAsTouched();
    }

}