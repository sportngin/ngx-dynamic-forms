import { InjectionToken } from '@angular/core';

import { extend, find } from 'lodash';

import { Behavior }     from './behavior/behaviors';
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

    behaviors?: Behavior[];
    mappings?: {
        buttons?: ButtonTypeHandlerMapping[];
        elements?: ElementTypeHandlerMapping[];
        fields?: FieldTypeHandlerMapping[];
    }

}

export function configFactory(defaultConfig: DynamicFormsConfig, userConfig: DynamicFormsConfig) {
    let result: DynamicFormsConfig = { behaviors: [], mappings: {} };

    // merge each mappings key
    Object.keys(defaultConfig.mappings).forEach(key => {
        result.mappings[key] = defaultConfig.mappings[key];
        let usr: TypeHandlerMapping[] = userConfig.mappings[key];
        if (!usr) {
            return;
        }

        usr.forEach(usrMapping => {
            let mapping = find(result.mappings[key], (mapping: TypeHandlerMapping) => mapping.type === usrMapping.type);
            if (!mapping) {
                result.mappings[key].push(usrMapping);
                return;
            }
            mapping.component = usrMapping.component;
        });

    });

    // merge behaviors
    result.behaviors.push(...defaultConfig.behaviors);
    if (userConfig.behaviors) {
        userConfig.behaviors.forEach(userBehavior => {
            let builtInBehavior = find(defaultConfig.behaviors, builtInBehavior => builtInBehavior.type === userBehavior.type);
            if (builtInBehavior) {
                throw extend(new Error('Cannot override built-in behaviors'), { behavior: userBehavior });
            }
            result.behaviors.push(userBehavior)
        });
    }


    return result;
}

export const DYNAMIC_FORMS_CONFIG = new InjectionToken<DynamicFormsConfig>('DynamicFormsConfig');
export const DYNAMIC_FORMS_USER_CONFIG = new InjectionToken<DynamicFormsConfig>('DynamicFormsUserConfig');
export const DYNAMIC_FORMS_DEFAULT_CONFIG = new InjectionToken<DynamicFormsConfig>('DynamicFormsDefaultConfig');