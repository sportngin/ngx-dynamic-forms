import { InjectionToken } from '@angular/core';

import { ElementPosition }      from '../element.position';
import { ToolTipPosition }      from '../tool.tip.position';
import { ElementType }          from './element.type';
import { ModelElementTipType }  from './model.element.tip.type';
import { ModelElement }         from './model.element';

export interface ModelElementTip extends ModelElement {
    elementType: ElementType.tip;
    position?: ElementPosition | ToolTipPosition;
    text: string;
    tipType: ModelElementTipType;
}

export const ELEMENT_TIP = new InjectionToken<ModelElementTip>('ELEMENT_TIP');