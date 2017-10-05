import { ElementTipAlignment }  from '../element.tip.alignment';
import { ElementType }          from './element.type';
import { ModelElementTipType }  from './model.element.tip.type';
import { ModelElementSibling }  from './model.element.sibling';

export interface ModelElementTip extends ModelElementSibling {
    elementType: ElementType.tip;
    alignment?: ElementTipAlignment;
    text: string;
    tipType: ModelElementTipType;
}