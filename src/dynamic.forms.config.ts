import { InjectionToken } from '@angular/core';

import { find } from 'lodash';

import { ElementType }  from './element.type';
import { ButtonType }   from './elements/button.type';
import { FieldType }    from './field.type';

export interface TypeHandlerMapping {
    type: string;
    component: any
}

export interface ButtonTypeHandlerMapping extends TypeHandlerMapping {
    type: ButtonType | string;
    component: any
}

export interface ElementTypeHandlerMapping extends TypeHandlerMapping {
    type: ElementType | string;
    component: any;
}

export interface FieldTypeHandlerMapping extends TypeHandlerMapping {
    type: FieldType | string;
    component: any;
}

export interface DynamicFormsConfig {

    buttons?: ButtonTypeHandlerMapping[];
    elements?: ElementTypeHandlerMapping[];
    fields?: FieldTypeHandlerMapping[];

}

export function configFactory(defaultConfig: DynamicFormsConfig, userConfig: DynamicFormsConfig) {
    let result: DynamicFormsConfig = {};

    Object.keys(defaultConfig).forEach(key => {
        result[key] = defaultConfig[key];
        let usr: TypeHandlerMapping[] = userConfig[key];
        if (!usr) {
            return;
        }

        usr.forEach(usrMapping => {
            let mapping = find(result[key], (mapping: TypeHandlerMapping) => mapping.type === usrMapping.type);
            if (!mapping) {
                result[key].push(usrMapping);
                return;
            }
            mapping.component = usrMapping.component;
        });

    });

    return result;
}

export const DYNAMIC_FORMS_CONFIG = new InjectionToken<DynamicFormsConfig>('DynamicFormsConfig');
export const DYNAMIC_FORMS_USER_CONFIG = new InjectionToken<DynamicFormsConfig>('DynamicFormsUserConfig');
export const DYNAMIC_FORMS_DEFAULT_CONFIG = new InjectionToken<DynamicFormsConfig>('DynamicFormsDefaultConfig');