import { Injector } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

import { ModelMember }          from '../model/member';
import { FormControlComponent } from './form.control.component';
import { MemberData }           from './member.data';
import { ValidatorDisplay }     from './validator.display';

export abstract class FormMemberComponent<
    TControl extends AbstractControl = FormControl,
    TModelMember extends ModelMember = ModelMember
    > extends FormControlComponent<TModelMember> {

    public get formControl(): TControl {
        return this.elementData.formControl as TControl;
    }

    public get validatorSuccess(): boolean {
        return this.validatorDisplay && this.validatorDisplay.isSuccess(this.formControl);
    }

    public get validatorError(): boolean {
        return this.validatorDisplay && this.validatorDisplay.isError(this.formControl);
    }

    private validatorDisplay: ValidatorDisplay;

    constructor(
        public elementData: MemberData,
        injector: Injector
    ) {
        super(elementData, injector);
        this.validatorDisplay = injector.get(ValidatorDisplay);
    }
}
