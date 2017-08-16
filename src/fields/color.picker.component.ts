import { Component, ElementRef, Host, Inject, Injector, Renderer2, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';

import { FormComponentHost }    from '../form.component.host';
import { FieldBase }            from './field.base';
import { FIELD_DATA_PROVIDER, FieldData } from './element.data';

@Component({
    selector: 'color-picker',
    templateUrl: './color.picker.pug',
    styleUrls: ['./color.picker.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ColorPickerComponent extends FieldBase<FormControl> {

    constructor(
        @Inject(FIELD_DATA_PROVIDER) elementData: FieldData,
        injector: Injector,
        @Host() host: FormComponentHost,
        private elementRef: ElementRef,
        private renderer: Renderer2
    ) {
        super(elementData, injector, host);
    }

    get value(): string {
        return this.formControl.value;
    }

    set value(color: string) {
        setTimeout(() => this.formControl.setValue(color));
    }

    onToggleChange(toggled: boolean): void {
        if (toggled) {
            this.renderer.addClass(this.elementRef.nativeElement, 'ngdf-colorpicker-toggled');
        } else {
            this.renderer.removeClass(this.elementRef.nativeElement, 'ngdf-colorpicker-toggled');
        }
    }

    onChange(): void {
        this.formControl.markAsDirty();
        this.formControl.markAsTouched();
    }

}