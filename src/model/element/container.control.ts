import { ModelControl } from './model.control';
import { ModelElement } from './model.element';

export interface ContainerControl extends ModelControl {

    children: ModelElement[];

}