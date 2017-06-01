import { ModelElement, ModelElementType }   from '../model.element';
import { ModelElementBase }                 from '../model.element.base';

export class ContainerMember extends ModelElementBase {

    constructor(
        memberType: ModelElementType,
        members: ModelElement[]
    ) {
        super(memberType);

        this.members = members;
    }

    public members: ModelElement[];

}