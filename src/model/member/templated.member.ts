import { ValidatorFn } from '@angular/forms';

import { ElementType }      from '../../element.type';
import { FieldType }        from '../../field.type';
import { Model }            from '../model';
import { ModelMemberBase }  from './model.member';
import { getCssClassArray, getCssClassFromArray } from '../css.helper';

export class TemplatedMember extends ModelMemberBase<TemplatedMember> {

    constructor(elementType: ElementType, controlType: FieldType | string, name: string, template: Model, validators?: ValidatorFn | ValidatorFn[], data?: {}) {
        super(elementType, controlType, name, validators, data);

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