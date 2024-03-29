import { InjectionToken } from '@angular/core';

import { ModelElement }         from './model.element';
import { ModelElementSibling }  from './model.element.sibling';

export interface ModelControl extends ModelElement {
    /** an optional array of sibling elements (tips, icons, etc) to be rendered for the element */
    siblings: ModelElementSibling[];
    /** determines whether the element is rendered as disabled */
    disabled: boolean;
}

export const MODEL_CONTROL = new InjectionToken<ModelControl>('ModelControl');
export const SIBLINGS_PROPERTY = 'siblings';