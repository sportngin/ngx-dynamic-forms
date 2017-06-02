import { InjectionToken } from '@angular/core';

import { FormControlType } from './form.control.type';

export interface FormControlTypeHandlerMapping {
    type: FormControlType | string;
    component: any
}

export interface DynamicFormsConfig {

    mappings: FormControlTypeHandlerMapping[]

}

export const DYNAMIC_FORMS_CONFIG = new InjectionToken<DynamicFormsConfig>('DynamicFormsConfig');