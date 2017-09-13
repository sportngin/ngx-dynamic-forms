import { ValidatorFn } from '@angular/forms';

import { ElementType }      from '../element/element.type';
import { getCssClassArray } from '../css.helper';
import { Model }            from '../model';
import { MemberType }       from './member.type';
import { ModelMemberBase }  from './model.member.base';

export class TemplatedMember extends ModelMemberBase<TemplatedMember> {

    constructor(elementType: ElementType, memberType: MemberType | string, name: string, template: Model, validators?: ValidatorFn | ValidatorFn[], data?: {}) {
        super(elementType, memberType, name, validators, data);

        this.template = template;
    }

    public template: Model;
    public itemCssClasses: string[];

    public addItemCssClass(...cssClasses: string[]): TemplatedMember {
        cssClasses = getCssClassArray(...cssClasses);
        if (!this.itemCssClasses) {
            this.itemCssClasses = cssClasses;
        } else {
            this.itemCssClasses.push(...cssClasses);
        }
        return this.self;
    }

}