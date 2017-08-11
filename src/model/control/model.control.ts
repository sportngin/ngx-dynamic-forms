import { InjectionToken }   from '@angular/core';

import { ElementType }      from '../../element.type';
import { FieldType }        from '../../field.type';
import { ControlPosition }  from '../control.position';
import { ElementHelper, ModelElement, ModelElementRenderCondition } from '../model.element';
import { ModelMember }      from '../member/model.member';
import { TemplatedMember }  from '../member/templated.member';

export interface ModelControl extends ModelElement {
    member: ModelElement;
    childControls: ModelControl[];
    hidden: boolean;
}

export const MODEL_CONTROL_PROVIDER = new InjectionToken<ModelControl>('ModelControl');

export abstract class ModelControlBase<TMember extends ModelElement> implements ModelControl {
    constructor(member: TMember) {
        this.member = member;
        this.elementType = member.elementType;
        this.cssClass = member.cssClass;
        this.renderConditions = member.renderConditions;
        this.helpers = member.helpers;
        this.disabled = member.disabled;
        this.displaysValidation = member.displaysValidation;
        this.data = member.data;
    }

    public member: TMember;
    public elementType: ElementType;
    public cssClass: string;
    public childControls: ModelControl[];
    public renderConditions: ModelElementRenderCondition[];
    public helpers: ElementHelper[];
    public get hidden() { return false; };
    public disabled: boolean;
    public displaysValidation: boolean;
    public data: { [key: string]: any };
}

export class ModelMemberControl<TModelMember extends ModelMember = ModelMember> extends ModelControlBase<TModelMember> {

    constructor(member: TModelMember) {
        super(member);

        this.name = member.name;
        this.label = member.label;
        this.labelPosition = member.labelPosition;

        if (member instanceof TemplatedMember) {
            this.childControls = (member as TemplatedMember).template.toControlGroup();
        }
    }

    public name: string;
    public label: string;
    public labelPosition: ControlPosition;

    public get hidden() { return this.member.fieldType === FieldType.hidden; }

}



