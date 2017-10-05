import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable()
export class ValidatorDisplay {

    isSuccess(formControl: AbstractControl): boolean {
        return formControl.validator && formControl.valid;
    }

    isError(formControl: AbstractControl): boolean {
        return formControl.validator && !formControl.valid && formControl.touched;
    }

}