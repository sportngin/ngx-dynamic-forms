import { ElementType }      from '../../element.type';
import { ModelElement }     from '../model.element';
import { ModelElementBase } from '../model.element.base';

export interface ContainerMember extends ModelElement {

    members: ModelElement[];

}

export class ContainerMemberBase<T extends ContainerMemberBase<T>> extends ModelElementBase<T> implements ContainerMember {

    constructor(
        elementType: ElementType,
        members: ModelElement[]
    ) {
        super(elementType);

        this.members = members;
    }

    public members: ModelElement[];

}