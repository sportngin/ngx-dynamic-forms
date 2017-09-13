import { FormControl, ValidatorFn } from '@angular/forms';

import { first, isArray, merge, union } from 'lodash';

import { BehaviorType }                 from '../../behavior';
import { ElementPosition }              from '../element.position';
import { ElementTipOptions, ElementTipOptionsWithDefaults } from '../element/element.tip.options';
import { ElementType }                  from '../element/element.type';
import { ModelElementBase }             from '../element/model.element.base';
import { ModelElementRenderCondition }  from '../element/model.element.render.condition';
import { MemberType }                   from './member.type';
import { ModelMemberBuilder }           from './model.member.builder';

export abstract class ModelMemberBase<T extends ModelMemberBase<T>> extends ModelElementBase<T> implements ModelMemberBuilder<T> {

    constructor(elementType: ElementType, MemberType: MemberType | string, name: string, validators?: ValidatorFn | ValidatorFn[], data?: { [key: string]: any }) {
        super(elementType);

        this.memberType = MemberType;
        this.name = name;
        this.validators = validators;
        this.data = data;
    }

    public name: string;
    public memberType: MemberType | string;
    public validators: ValidatorFn | ValidatorFn[];
    public get validator(): ValidatorFn {
        if (!isArray(this.validators)) {
            return this.validators as ValidatorFn;
        }
        return first(this.validators);
    }
    public label: string;
    public labelPosition: ElementPosition = ElementPosition.before;
    public displaysValidation: boolean = true;

    public addLabel(label: string): T {
        this.label = label;
        return this.self;
    }

    public addValidationMessage(errorKey: string, text: string, options?: ElementTipOptions): T {

        let renderCondition: ModelElementRenderCondition = {
            key: `${this.name}:${errorKey}`,
            method: BehaviorType.validateDisplay,
            required: true
        };
        let optionsWithDefaults = merge(new ElementTipOptionsWithDefaults(), options);
        return this.addTip(
            optionsWithDefaults.tipType,
            text,
            `${optionsWithDefaults.cssClass || ''}.validation-message`,
            optionsWithDefaults.position,
            optionsWithDefaults.alignment,
            union([renderCondition], optionsWithDefaults.renderConditions),
            union([{ cssClasses: ['has-validation-message']}], optionsWithDefaults.renderOnParent)
        );
    }

    public setDisplaysValidation(displaysValidation: boolean): T {
        this.displaysValidation = displaysValidation;
        return this.self;
    }

    public createFormControl(): FormControl {
        return new FormControl(null, this.validators);
    }

}