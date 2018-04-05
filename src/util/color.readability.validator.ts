import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';

import { TinyColor } from '@thebespokepixel/es-tinycolor';

function isTinyColorInstance(color: ColorAccessor): boolean {
    return color && color.hasOwnProperty('_tc_id');
}

export type ColorAccessor = TinyColor | ColorFieldAccessor;

export enum WCAG2Level {
    AA = 'AA',
    AAA = 'AAA'
}

export enum WCAG2Size {
    large = 'large',
    small = 'small'
}

export interface WCAG2Options {
    level?: WCAG2Level,
    size?: WCAG2Size
}

export class ColorFieldAccessor {
    constructor(public fieldName: string, private multi: boolean = false) {}

    getColor(c: AbstractControl): TinyColor {
        let value = this.multi ? (c as FormGroup).controls[this.fieldName].value : c.value;
        return new TinyColor(value || 'white');
    }
}

export class ColorReadabilityValidator {

    constructor(
        private foreground: ColorAccessor,
        private background: ColorAccessor
    ) {}

    private getColor(g: FormGroup, color: ColorAccessor): TinyColor {
        if (!color) {
            return null;
        }
        if (isTinyColorInstance(color)) {
            return color as TinyColor;
        }
        return (color as ColorFieldAccessor).getColor(g);
    }

    private getFieldName(color: ColorAccessor): string {
        if (isTinyColorInstance(color)) {
            return null;
        }
        return (color as ColorFieldAccessor).fieldName;
    }

    public validate(c: AbstractControl, wcag2?: WCAG2Options): any {
        let g = c as FormGroup;

        let isMultiValidator = !isTinyColorInstance(this.foreground) && !isTinyColorInstance(this.background);

        let foregroundColor = this.getColor(g, this.foreground);
        let backgroundColor = this.getColor(g, this.background);

        if (!TinyColor.isReadable(foregroundColor, backgroundColor, wcag2)) {
            let colorReadability = TinyColor.readability(foregroundColor, backgroundColor);
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

    public static validatorForFields(foregroundFieldName: string, backgroundFieldName: string, wcag2?: WCAG2Options): ValidatorFn {
        let validator = new ColorReadabilityValidator(new ColorFieldAccessor(foregroundFieldName, true), new ColorFieldAccessor(backgroundFieldName, true));
        return (c: AbstractControl) => validator.validate(c, wcag2);
    }

    public static validatorForBackground(foregroundColor: string | TinyColor, backgroundFieldName: string, wcag2?: WCAG2Options): ValidatorFn {
        let validator = new ColorReadabilityValidator(typeof foregroundColor === 'string' ? new TinyColor(foregroundColor) : foregroundColor, new ColorFieldAccessor(backgroundFieldName));
        return (c: AbstractControl) => validator.validate(c, wcag2);
    }

    public static validatorForForeground(foregroundFieldName: string, backgroundColor: string | TinyColor, wcag2?: WCAG2Options): ValidatorFn {
        let validator = new ColorReadabilityValidator(new ColorFieldAccessor(foregroundFieldName), typeof backgroundColor === 'string' ? new TinyColor(backgroundColor) : backgroundColor);
        return (c: AbstractControl) => validator.validate(c, wcag2);
    }

}