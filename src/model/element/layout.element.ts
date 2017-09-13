import { extend } from 'lodash';

import { ContainerElementBase } from './container.element.base';
import { ElementType }          from './element.type';
import { ModelElement }         from './model.element';

export class LayoutElement extends ContainerElementBase<LayoutElement> {

    public attributes: { [name: string]: string };

    constructor(
        cssClass: string,
        children: ModelElement[]
    ) {
        super(ElementType.layout, children);

        this.addCssClass(cssClass.replace(/\./g, ' ').trim());
    }

    public addAttribute(name: string, value: string): LayoutElement {
        let attributes = {};
        attributes[name] = value;
        return this.addAttributes(attributes);
    }

    public addAttributes(attributes: { [name: string]: string }): LayoutElement {
        if (this.attributes) {
            extend(this.attributes, attributes);
        } else {
            this.attributes = attributes;
        }
        return this;
    }
}