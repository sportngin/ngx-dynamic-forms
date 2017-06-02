import { ValidatorFn } from '@angular/forms';

import { first, isArray } from 'lodash';

import { FormControlType }                                                  from '../../form.control.type';
import { ControlPosition, ControlPositions }                                from '../control.position';
import {
    ElementHelper, ModelElement, ModelElementBuilder,
    ModelElementType
}  from '../model.element';
import { ModelElementBase } from '../model.element.base';

export interface ModelMember extends ModelElement {
    name: string;
    controlType: any;
    validators: ValidatorFn | ValidatorFn[];
    data: {};
    label: string;
    labelPosition: ControlPosition;
}

export interface ModelMemberBuilder extends ModelMember, ModelElementBuilder {
    addData: (key: string, value: any) => ModelMemberBuilder;
    addLabel: (label: string) => ModelMemberBuilder;
}

export abstract class ModelMemberBase extends ModelElementBase implements ModelMemberBuilder {

    constructor(elementType: ModelElementType, controlType: FormControlType | string, name: string, validators?: ValidatorFn | ValidatorFn[], data?: { [key: string]: any }) {
        super(elementType);

        this.controlType = controlType;
        this.name = name;
        this.validators = validators;
        this.data = data;
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
    public data: { [key: string]: any };
    public label: string;
    public labelPosition: ControlPosition = ControlPositions.before;
    public helpers: ElementHelper[];

    public addData(key: string, value: any): ModelMemberBuilder {
        if (!this.data) {
            this.data = {};
        }
        this.data[key] = value;
        return this;
    }

    public addLabel(label: string): ModelMemberBuilder {
        this.label = label;
        return this;
    }

}