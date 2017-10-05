import { Component, Injector, ViewEncapsulation } from '@angular/core';

import { CustomMember, FormMemberComponent, MemberData } from '@siplay/ng-dynamic-forms';

import * as tinyColor from 'tinycolor2';

@Component({
    selector: 'color-preview',
    templateUrl: './color.preview.component.pug',
    styleUrls: ['./color.preview.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ColorPreviewComponent extends FormMemberComponent<CustomMember> {

    get foregroundColor(): string {
        if (this.element.data.foregroundColor) {
            return tinyColor(this.element.data.foregroundColor).toHexString();
        }
        return this.formControl.parent.controls[this.element.data.foregroundColorFieldName].value;
    }

    get backgroundColor(): string {
        if (this.element.data.backgroundColor) {
            return tinyColor(this.element.data.backgroundColor).toHexString();
        }
        return this.formControl.parent.controls[this.element.data.backgroundColorFieldName].value;
    }

    get text(): string {
        return this.element.data.text || 'Your Colors!';
    }

    constructor(
        elementData: MemberData,
        injector: Injector
    ) {
        super(elementData, injector);

        // disabling prevents the control from being included in the parent form's value output
        setTimeout(() => this.formControl.disable());
    }
}