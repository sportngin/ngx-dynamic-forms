import { Component, ElementRef, Inject, Injector, Renderer2, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';

import { FieldBase }                        from './field.base';
import { FIELD_DATA_PROVIDER, FieldData }   from './element.data';

@Component({
    selector: 'color-picker',
    templateUrl: './color.picker.component.pug',
    styleUrls: ['./color.picker.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ColorPickerComponent extends FieldBase<FormControl> {

    constructor(
        @Inject(FIELD_DATA_PROVIDER) elementData: FieldData,
        injector: Injector,
        private elementRef: ElementRef,
        private renderer: Renderer2
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