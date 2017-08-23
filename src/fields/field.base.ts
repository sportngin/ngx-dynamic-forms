import { Injector } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

import { HostedElement }        from '../hosted.element';
import { ModelControl }         from '../model/control/model.control';
import { ValidatorDisplay }     from '../validator.display';
import { FieldData }            from './element.data';

export abstract class FieldBase<
    TControl extends AbstractControl = FormControl,
    TModelControl extends ModelControl = ModelControl
    > extends HostedElement<TModelControl> {

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
        public elementData: FieldData,
        injector: Injector
    ) {
        super(elementData, injector);
        this.validatorDisplay = injector.get(ValidatorDisplay);
    }
}
