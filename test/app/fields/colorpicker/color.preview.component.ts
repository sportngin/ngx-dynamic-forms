import { Component, Inject, Injector, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FieldBase, FormComponentHost } from '@siplay/ng-dynamic-forms';

import * as tinyColor from 'tinycolor2';
import { ELEMENT_DATA_PROVIDER, ElementData } from '../../../../src/fields/element.data';

@Component({
    selector: 'color-preview',
    templateUrl: './color.preview.pug',
    styleUrls: ['./color.preview.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ColorPreviewComponent extends FieldBase {

    get foregroundColor(): string {
        if (this.control.data.foregroundColor) {
            return tinyColor(this.control.data.foregroundColor).toHexString();
        }
        return this.formControl.parent.controls[this.control.data.foregroundColorFieldName].value;
    }

    get backgroundColor(): string {
        if (this.control.data.backgroundColor) {
            return tinyColor(this.control.data.backgroundColor).toHexString();
        }
        return this.formControl.parent.controls[this.control.data.backgroundColorFieldName].value;
    }

    get text(): string {
        return this.control.data.text || 'Your Colors!';
    }

    constructor(
        @Inject(ELEMENT_DATA_PROVIDER) elementData: ElementData,
        injector: Injector,
        host: FormComponentHost
    ) {
        super(elementData, injector, host);

        // disabling prevents the control from being included in the parent form's value output
        setTimeout(() => this.formControl.disable());
    }
}