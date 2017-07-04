import { extend } from 'lodash';

import { ModelElement, ModelElementType }   from '../model.element';
import { ContainerMemberBase }              from './container.member';

export class LayoutMember extends ContainerMemberBase<LayoutMember> {

    public attributes: { [name: string]: string };

    constructor(
        cssClass: string,
        members: ModelElement[]
    ) {
        super(ModelElementType.layout, members);

        this.addCssClass(cssClass.replace(/\./g, ' ').trim());
    }

    public addAttribute(name: string, value: string): LayoutMember {
        let attributes = {};
        attributes[name] = value;
        return this.addAttributes(attributes);
    }

    public addAttributes(attributes: { [name: string]: string }): LayoutMember {
        if (this.attributes) {
            extend(this.attributes, attributes);
        } else {
            this.attributes = attributes;
        }
        return this;
    }
}