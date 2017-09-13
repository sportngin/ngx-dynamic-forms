import { InjectionToken } from '@angular/core';

import { ModelElement }                 from './model.element';
import { ModelElementTip }              from './model.element.tip';

/**
 *
 */
export interface ModelControl extends ModelElement {
    /** an optional array of helpers to be rendered for the element */
    tips?: ModelElementTip[];
    /** determines whether the element is rendered as disabled */
    disabled: boolean;
    /** arbitrary data used to assist with the rendering or validation of the element **/
    data: { [key: string]: any };
}

export const MODEL_CONTROL = new InjectionToken<ModelControl>('ModelControl');