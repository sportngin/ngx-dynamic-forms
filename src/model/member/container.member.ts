import { ModelElement, ModelElementType }   from '../model.element';
import { ModelElementBase }                 from '../model.element.base';

export interface ContainerMember extends ModelElement {

    members: ModelElement[];

}

export class ContainerMemberBase<T extends ContainerMemberBase<T>> extends ModelElementBase<T> implements ContainerMember {

    constructor(
        memberType: ModelElementType,
        members: ModelElement[]
    ) {
        super(memberType);

        this.members = members;
    }

    public members: ModelElement[];

}