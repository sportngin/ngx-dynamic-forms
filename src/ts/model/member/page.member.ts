import { ModelElement, ModelElementTypes }  from '../model.element';
import { ContainerMember }                  from './container.member';

export class PageMember extends ContainerMember {

    constructor(
        members: ModelElement[]
    ) {
        super(ModelElementTypes.page, members);
    }

}

export class RootPageMember extends ContainerMember {

    constructor(
        members: PageMember[]
    ) {
        super(ModelElementTypes.page, members);
    }

}