import { ElementHelper, ModelElement, ModelElementRenderCondition, ModelElementType } from '../model.element';
import { FormControlType }      from '../../form.control.type';
import { ControlPosition }      from '../control.position';
import { ModelMember }          from '../member/model.member';
import { TemplatedMember }      from '../member/templated.member';

export interface ModelControl extends ModelElement {
    member: ModelElement;
    childControls: ModelControl[];
    hidden: boolean;
}

export abstract class ModelControlBase<TMember extends ModelElement> implements ModelControl {
    constructor(member: TMember) {
        this.member = member;
        this.elementType = member.elementType;
        this.cssClass = member.cssClass;
        this.renderConditions = member.renderConditions;
        this.helpers = member.helpers;
        this.disabled = member.disabled;
    }

    public member: TMember;
    public elementType: ModelElementType;
    public cssClass: string;
    public childControls: ModelControl[];
    public renderConditions: ModelElementRenderCondition[];
    public helpers: ElementHelper[];
    public get hidden() { return false; };
    public disabled: boolean;
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

    public get hidden() { return this.member.controlType === FormControlType.hidden; }

}



