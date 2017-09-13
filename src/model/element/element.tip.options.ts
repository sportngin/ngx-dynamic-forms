import { ToolTipPosition }      from '../tool.tip.position';
import { ElementPosition }      from '../element.position';
import { ElementTipAlignment }  from '../element.tip.alignment';
import { RenderOnParent }       from '../render.on.parent';
import { ModelElementRenderCondition } from './model.element.render.condition';
import { ModelElementTipType }  from './model.element.tip.type';

export type ModelElementTipPosition = ElementPosition | ToolTipPosition;

export interface ElementTipOptions {
    tipType?: ModelElementTipType;
    position?: ModelElementTipPosition;
    alignment?: ElementTipAlignment;
    cssClass?: string;
    renderConditions?: ModelElementRenderCondition[];
    renderOnParent?: RenderOnParent[];
}

export class ElementTipOptionsWithDefaults implements ElementTipOptions {

    constructor(
        public tipType: ModelElementTipType = ModelElementTipType.sibling,
        public position: ModelElementTipPosition = ElementPosition.after,
        public alignment: ElementTipAlignment = ElementTipAlignment.left,
        public cssClass?: string,
        public renderConditions?: ModelElementRenderCondition[],
        public renderOnParent?: RenderOnParent[]
    ) {}

}

export class ElementToolTipOptions extends ElementTipOptionsWithDefaults {
    constructor(
        public position: ModelElementTipPosition = ToolTipPosition.top,
        public alignment: ElementTipAlignment = ElementTipAlignment.left,
        public cssClass?: string,
        public renderConditions?: ModelElementRenderCondition[],
        public renderOnParent?: RenderOnParent[]
    ) {
        super(ModelElementTipType.tooltip, position, alignment, cssClass, renderConditions, renderOnParent);
    }
}