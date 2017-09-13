import { ModelElement } from './model.element';

export interface ContainerElement extends ModelElement {

    children: ModelElement[];

}