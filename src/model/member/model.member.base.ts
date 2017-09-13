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

    constructor(elementType: ElementType, memberType: MemberType | string, name: string, validators?: ValidatorFn | ValidatorFn[], data?: { [key: string]: any }) {
        super(elementType, `${elementType}-${memberType}`);

        this.memberType = memberType;
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
        if (!options) {
            options = {};
        }
        return this.addTip(
            options.tipType,
            'member-validation-message',
            text,
            `${(options.cssClasses || []).join('.')}.validation-message`,
            options.position,
            options.alignment,
            union([renderCondition], options.renderConditions),
            union([{ cssClasses: ['has-validation-message']}], options.renderOnParent)
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