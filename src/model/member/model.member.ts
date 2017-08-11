import { FormControl, ValidatorFn } from '@angular/forms';

import { first, isArray } from 'lodash';

import { BehaviorType }     from '../../behavior/behaviors';
import { ElementType }      from '../../element.type';
import { FieldType }        from '../../field.type';
import { ControlPosition }  from '../control.position';
import {
    ElementHelper, ModelElement, ModelElementBuilder, ModelElementRenderCondition
} from '../model.element';
import { ModelElementBase } from '../model.element.base';

export interface ModelMember extends ModelElement {
    name: string;
    fieldType: any;
    validator: ValidatorFn;
    validators: ValidatorFn | ValidatorFn[];
    label: string;
    labelPosition: ControlPosition;
}

export interface ModelMemberBuilder<T extends ModelMemberBuilder<T>> extends ModelMember, ModelElementBuilder<T> {
    addLabel: (label: string) => T;
    addValidationMessage: (key: string, text: string, cssClass?: string, position?: ControlPosition) => T;
}

export abstract class ModelMemberBase<T extends ModelMemberBase<T>> extends ModelElementBase<T> implements ModelMemberBuilder<T> {

    constructor(elementType: ElementType, fieldType: FieldType | string, name: string, validators?: ValidatorFn | ValidatorFn[], data?: { [key: string]: any }) {
        super(elementType);

        this.fieldType = fieldType;
        this.name = name;
        this.validators = validators;
    }

    public name: string;
    public fieldType: FieldType | string;
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

    public addValidationMessage(errorKey: string, text: string, cssClass?: string, position: ControlPosition = ControlPosition.after): T {
        let renderCondition: ModelElementRenderCondition = { key: `${this.name}:${errorKey}`, method: BehaviorType.validateDisplay, required: true };
        return this.addHelper(text, cssClass, position, renderCondition);
    }

    public createFormControl(): FormControl {
        return new FormControl(null, this.validators);
    }

}