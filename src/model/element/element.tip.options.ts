import { ElementAbsolutePosition }      from '../element.absolute.position';
import { ElementSiblingPosition }       from '../element.sibling.position';
import { ElementTipAlignment }          from '../element.tip.alignment';
import { RenderOnParent }               from '../render.on.parent';
import { ModelElementRenderCondition }  from './model.element.render.condition';
import { ModelElementTipType }          from './model.element.tip.type';

import { merge, union } from 'lodash-es';

export type ModelElementSiblingPosition = ElementSiblingPosition | ElementAbsolutePosition;

export interface ElementTipOptions {
    tipType?: ModelElementTipType;
    position?: ModelElementSiblingPosition;
    alignment?: ElementTipAlignment;
    cssClasses?: string[];
    renderConditions?: ModelElementRenderCondition[];
    renderOnParent?: RenderOnParent[];
}

export function optionsMerge(objValue: any, srcValue: any): any {
    if (Array.isArray(objValue) && Array.isArray(srcValue)) {
        return union(objValue, srcValue);
    }
    return objValue;
}

export class ElementTipOptionsWithDefaults implements ElementTipOptions {

    public tipType: ModelElementTipType;
    public position: ModelElementSiblingPosition;
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
            { position: ElementSiblingPosition.after },
            options,
            { tipType: ModelElementTipType.sibling }
        );
    }
}

export class ElementToolTipOptions extends ElementTipOptionsWithDefaults {
    constructor(options?: ElementTipOptions) {
        super(
            { position: ElementAbsolutePosition.top },
            options,
            { tipType: ModelElementTipType.tooltip }
        );
    }
}