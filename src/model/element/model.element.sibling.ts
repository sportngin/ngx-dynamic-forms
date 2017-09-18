import { ModelElementSiblingPosition }  from './element.tip.options';
import { ModelElement }                 from './model.element';

export interface ModelElementSibling extends ModelElement {

    position?: ModelElementSiblingPosition;

}