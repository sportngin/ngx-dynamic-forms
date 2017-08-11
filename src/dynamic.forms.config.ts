import { InjectionToken } from '@angular/core';

import { ElementType }  from './element.type';
import { FieldType }    from './field.type';

export interface ElementTypeHandlerMapping {
    type: ElementType | string;
    component: any;
}

export interface FieldTypeHandlerMapping {
    type: FieldType | string;
    component: any;
}

export interface DynamicFormsConfig {

    elements?: ElementTypeHandlerMapping[];
    fields?: FieldTypeHandlerMapping[];

}

export const DYNAMIC_FORMS_CONFIG = new InjectionToken<DynamicFormsConfig>('DynamicFormsConfig');