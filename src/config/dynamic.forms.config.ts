import { InjectionToken } from '@angular/core';

import { extend, find, merge } from 'lodash';

import { Behavior }         from '../behavior';
import { ElementType, ModelElementRenderCondition }  from '../model/element';
import { MemberType }       from '../model/member';
import { RenderOnParent }   from '../model/render.on.parent';

export interface TypeHandlerMapping {
    type: string;
    component: any
}

export interface ElementTypeHandlerMapping extends TypeHandlerMapping {
    type: ElementType | string;
}

export interface MemberTypeHandlerMapping extends TypeHandlerMapping {
    type: MemberType | string;
}

export interface OptionsMap {
    cssClass?: string;
    renderConditions?: ModelElementRenderCondition[];
    renderOnParent?: RenderOnParent[];

    [option: string]: any
}

export type OptionsDefaults = { [key: string]: OptionsMap };

export interface DynamicFormsConfig {

    behaviors?: Behavior[];

    defaultOptions?: OptionsDefaults;

    mappings?: {
        elements?: ElementTypeHandlerMapping[];
        members?: MemberTypeHandlerMapping[];
    };

}

export function configFactory(defaultConfig: DynamicFormsConfig, userConfig: DynamicFormsConfig) {
    let result: DynamicFormsConfig = { behaviors: [], defaultOptions: {}, mappings: {} };

    // merge behaviors
    result.behaviors.push(...defaultConfig.behaviors);
    if (userConfig && userConfig.behaviors) {
        userConfig.behaviors.forEach(userBehavior => {
            let builtInBehavior = find(defaultConfig.behaviors, builtInBehavior => builtInBehavior.type === userBehavior.type);
            if (builtInBehavior) {
                throw extend(new Error('Cannot override built-in behaviors'), { behavior: userBehavior });
            }
            result.behaviors.push(userBehavior)
        });
    }

    merge(result.defaultOptions, defaultConfig.defaultOptions, userConfig ? userConfig.defaultOptions : null);

    // merge each mappings key
    Object.keys(defaultConfig.mappings).forEach(key => {
        result.mappings[key] = defaultConfig.mappings[key];
        if (!userConfig) {
            return;
        }
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


    return result;
}

export const DYNAMIC_FORMS_CONFIG = new InjectionToken<DynamicFormsConfig>('DynamicFormsConfig');
export const DYNAMIC_FORMS_USER_CONFIG = new InjectionToken<DynamicFormsConfig>('DynamicFormsUserConfig');
export const DYNAMIC_FORMS_DEFAULT_CONFIG = new InjectionToken<DynamicFormsConfig>('DynamicFormsDefaultConfig');