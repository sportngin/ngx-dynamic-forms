import { ValidatorFn } from '@angular/forms';

import { getCssClassArray }         from '../css.helper';
import { ElementType }              from '../element/element.type';
import { Model }                    from '../model';
import { MemberType }               from './member.type';
import { ModelMemberBase }          from './model.member.base';
import { TemplatedMemberBuilder }   from './templated.member.builder';

export class TemplatedMemberBase<T extends TemplatedMemberBase<T>> extends ModelMemberBase<T> implements TemplatedMemberBuilder<T>{

    constructor(elementType: ElementType, memberType: MemberType | string, name: string, template: Model, validators?: ValidatorFn | ValidatorFn[], data?: {}) {
        super(elementType, memberType, name, validators, data);

        this.template = template;
    }

    public template: Model;
    public itemCssClasses: string[];

    public addItemCssClass(...cssClasses: string[]): T {
        cssClasses = getCssClassArray(...cssClasses);
        if (!this.itemCssClasses) {
            this.itemCssClasses = cssClasses;
        } else {
            this.itemCssClasses.push(...cssClasses);
        }
        return this.self;
    }

}