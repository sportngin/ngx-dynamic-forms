import { ToolTipPosition }      from '../tool.tip.position';
import { ElementPosition }      from '../element.position';
import { ElementTipAlignment }  from '../element.tip.alignment';
import { RenderOnParent }       from '../render.on.parent';
import { ModelElementRenderCondition } from './model.element.render.condition';
import { ModelElementTipType }  from './model.element.tip.type';

import { isArray, merge, union } from 'lodash';

export type ModelElementTipPosition = ElementPosition | ToolTipPosition;

export interface ElementTipOptions {
    tipType?: ModelElementTipType;
    position?: ModelElementTipPosition;
    alignment?: ElementTipAlignment;
    cssClasses?: string[];
    renderConditions?: ModelElementRenderCondition[];
    renderOnParent?: RenderOnParent[];
}

export function optionsMerge(objValue, srcValue): any {
    if (isArray(objValue) && isArray(srcValue)) {
        return union(objValue, srcValue);
    }
}

export class ElementTipOptionsWithDefaults implements ElementTipOptions {

    public tipType: ModelElementTipType;
    public position: ModelElementTipPosition;
    public alignment: ElementTipAlignment = ElementTipAlignment.left;
    public cssClasses: string[];
    public renderConditions?: ModelElementRenderCondition[];
    public renderOnParent?: RenderOnParent[];

    constructor(...options: ElementTipOptions[]) {
        merge(this, ...options);
    }

}

export class ElementSiblingTipOptions extends ElementTipOptionsWithDefaults {
    constructor(options?: ElementTipOptions) {
        super(
            { position: ElementPosition.after },
            options,
            { tipType: ModelElementTipType.sibling }
        );
    }
}

export class ElementToolTipOptions extends ElementTipOptionsWithDefaults {
    constructor(options?: ElementTipOptions) {
        super(
            { position: ToolTipPosition.top },
            options,
            { tipType: ModelElementTipType.tooltip }
        );
    }
}