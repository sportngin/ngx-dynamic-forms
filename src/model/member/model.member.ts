import { FormControl, ValidatorFn } from '@angular/forms';

import { first, isArray } from 'lodash';

import { FormControlType }  from '../../form.control.type';
import { ControlPosition }  from '../control.position';
import { ElementHelper, ModelElement, ModelElementBuilder, ModelElementType } from '../model.element';
import { ModelElementBase } from '../model.element.base';

export interface ModelMember extends ModelElement {
    name: string;
    controlType: any;
    validator: ValidatorFn;
    validators: ValidatorFn | ValidatorFn[];
    label: string;
    labelPosition: ControlPosition;
}

export interface ModelMemberBuilder<T extends ModelMemberBuilder<T>> extends ModelMember, ModelElementBuilder<T> {
    addLabel: (label: string) => T;
}

export abstract class ModelMemberBase<T extends ModelMemberBase<T>> extends ModelElementBase<T> implements ModelMemberBuilder<T> {

    constructor(elementType: ModelElementType, controlType: FormControlType | string, name: string, validators?: ValidatorFn | ValidatorFn[], data?: { [key: string]: any }) {
        super(elementType);

        this.controlType = controlType;
        this.name = name;
        this.validators = validators;
    }

    public name: string;
    public controlType: FormControlType | string;
    public validators: ValidatorFn | ValidatorFn[];
    public get validator(): ValidatorFn {
        if (!isArray(this.validators)) {
            return this.validators as ValidatorFn;
        }
        return first(this.validators);
    }
    public label: string;
    public labelPosition: ControlPosition = ControlPosition.before;
    public helpers: ElementHelper[];

    public addLabel(label: string): T {
        this.label = label;
        return this.self;
    }

    public createFormControl(): FormControl {
        return new FormControl(null, this.validators);
    }

}