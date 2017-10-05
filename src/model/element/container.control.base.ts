import { ContainerControl } from './container.control';
import { ElementType }      from './element.type';
import { ModelControlBase } from './model.control.base';
import { ModelElement }     from './model.element';

export class ContainerControlBase<T extends ContainerControlBase<T>> extends ModelControlBase<T> implements ContainerControl {

    constructor(
        elementType: ElementType,
        children: ModelElement[]
    ) {
        super(elementType);

        this.children = children;
    }

    public children: ModelElement[];

}