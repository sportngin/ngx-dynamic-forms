import { AsyncValidatorFn, FormControl, ValidatorFn } from '@angular/forms';

export type DisplayValueFn = (value: any) => string;

export class DisplayValueFormControl /*extends FormControl*/ {

    public displayValue: string;

    // constructor(formState?: any, validator?: ValidatorFn | ValidatorFn[] | null, asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null, displayValueFn?: DisplayValueFn) {
    //     super(formState, validator, asyncValidator);
    //
    //     this.valueChanges.subscribe((value: any) => {
    //         this.displayValue = displayValueFn(value);
    //     });
    // }

}