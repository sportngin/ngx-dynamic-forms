import { extend } from 'lodash';

import { ContainerControlBase } from './container.control.base';
import { ElementType }          from './element.type';
import { ModelElement }         from './model.element';

export class LayoutControl extends ContainerControlBase<LayoutControl> {

    public attributes: { [name: string]: string };

    constructor(
        cssClass: string,
        children: ModelElement[]
    ) {
        super(ElementType.layout, children);

        this.addCssClass(cssClass.replace(/\./g, ' ').trim());
    }

    public addAttribute(name: string, value: string): LayoutControl {
        let attributes = {};
        attributes[name] = value;
        return this.addAttributes(attributes);
    }

    public addAttributes(attributes: { [name: string]: string }): LayoutControl {
        if (this.attributes) {
            extend(this.attributes, attributes);
        } else {
            this.attributes = attributes;
        }
        return this;
    }
}