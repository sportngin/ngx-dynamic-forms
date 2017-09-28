import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';

import * as tinyColor from 'tinycolor2';

function isTinyColorInstance(color: ColorAccessor): boolean {
    return color && color.hasOwnProperty('_tc_id');
}

export type ColorAccessor = tinycolorInstance | ColorFieldAccessor;

export class ColorFieldAccessor {
    constructor(public fieldName: string, private multi: boolean = false) {}

    getColor(c: AbstractControl): tinycolorInstance {
        let value = this.multi ? (c as FormGroup).controls[this.fieldName].value : c.value;
        return tinyColor(value || 'white');
    }
}

export class ColorReadabilityValidator {

    constructor(
        private foreground: ColorAccessor,
        private background: ColorAccessor,
        private wcag2?: { level?: string, size?: string }
    ) {}

    private getColor(g: FormGroup, color: ColorAccessor): tinycolorInstance {
        if (!color) {
            return null;
        }
        if (isTinyColorInstance(color)) {
            return color as tinycolorInstance;
        }
        return (color as ColorFieldAccessor).getColor(g);
    }

    private getFieldName(color: ColorAccessor): string {
        if (isTinyColorInstance(color)) {
            return null;
        }
        return (color as ColorFieldAccessor).fieldName;
    }

    public validate(c: AbstractControl): any {
        let g = c as FormGroup;

        let isMultiValidator = !isTinyColorInstance(this.foreground) && !isTinyColorInstance(this.background);

        let foregroundColor = this.getColor(g, this.foreground);
        let backgroundColor = this.getColor(g, this.background);

        if (!tinyColor.isReadable(foregroundColor, backgroundColor, this.wcag2)) {
            let colorReadability = tinyColor.readability(foregroundColor, backgroundColor);
            let err = { colorReadability };

            if (!isMultiValidator) {
                return err;
            }

            let result = {};

            let foregroundFieldName = this.getFieldName(this.foreground);
            if (foregroundFieldName) {
                result[foregroundFieldName] = err;
            }

            let backgroundFieldName = this.getFieldName(this.background);
            if (backgroundFieldName) {
                result[backgroundFieldName] = err;
            }
            return result;
        }

        return null;
    }

    public static validatorForFields(foregroundFieldName: string, backgroundFieldName: string): ValidatorFn {
        let validator = new ColorReadabilityValidator(new ColorFieldAccessor(foregroundFieldName, true), new ColorFieldAccessor(backgroundFieldName, true));
        return (c: AbstractControl) => validator.validate(c);
    }

    public static validatorForBackground(foregroundColor: string | tinycolorInstance, backgroundFieldName: string): ValidatorFn {
        let validator = new ColorReadabilityValidator(typeof foregroundColor === 'string' ? tinyColor(foregroundColor) : foregroundColor, new ColorFieldAccessor(backgroundFieldName));
        return (c: AbstractControl) => validator.validate(c);
    }

    public static validatorForForeground(foregroundFieldName: string, backgroundColor: string | tinycolorInstance): ValidatorFn {
        let validator = new ColorReadabilityValidator(new ColorFieldAccessor(foregroundFieldName), typeof backgroundColor === 'string' ? tinyColor(backgroundColor) : backgroundColor);
        return (c: AbstractControl) => validator.validate(c);
    }

}