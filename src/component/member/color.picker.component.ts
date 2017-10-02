import { Component, Injector, ViewEncapsulation } from '@angular/core';

import { FormMemberComponent }  from '../form.member.component';
import { MemberData }           from '../member.data';

@Component({
    selector: 'color-picker-input',
    templateUrl: './color.picker.component.pug',
    styleUrls: ['./color.picker.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ColorPickerComponent extends FormMemberComponent {

    constructor(
        elementData: MemberData,
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