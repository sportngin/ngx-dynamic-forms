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

    public addItemCssClass(...cssClass: string[]): TemplatedMember {
        cssClass = getCssClassArray(...cssClass);
        if (!this.itemCssClasses) {
            this.itemCssClasses = cssClass;
        } else {
            this.itemCssClasses.push(...cssClass);
        }
        return this;
    }

    public get itemCssClass(): string {
        return getCssClassFromArray(this.itemCssClasses);
    }

}