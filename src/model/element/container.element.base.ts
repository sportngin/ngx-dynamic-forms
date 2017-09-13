import { ContainerElement } from './container.element';
import { ElementType }      from './element.type';
import { ModelElement }     from './model.element';
import { ModelElementBase } from './model.element.base';

export class ContainerElementBase<T extends ContainerElementBase<T>> extends ModelElementBase<T> implements ContainerElement {

    constructor(
        elementType: ElementType,
        children: ModelElement[]
    ) {
        super(elementType, elementType);

        this.children = children;
    }

    public children: ModelElement[];

}