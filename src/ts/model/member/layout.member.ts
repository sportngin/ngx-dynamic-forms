import { ModelElement, ModelElementTypes }  from '../model.element';
import { ContainerMember }                  from './container.member';

export class LayoutMember extends ContainerMember {

    constructor(
        cssClass: string,
        members: ModelElement[]
    ) {
        super(ModelElementTypes.layout, members);

        this.addCssClass(cssClass.replace(/\./g, ' ').trim());
    }
}