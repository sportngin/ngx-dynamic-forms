import { Inject, Injectable } from '@angular/core';

import { DynamicFormsConfig, DYNAMIC_FORMS_CONFIG } from './dynamic.forms.config';

import { ElementType }          from './element.type';
import { TypeMappingService }   from './type.mapping.service';

const CONFIG_KEY = 'elements';

@Injectable()
export class ElementTypeMappings extends TypeMappingService<ElementType> {
    constructor(
        @Inject(DYNAMIC_FORMS_CONFIG) config: DynamicFormsConfig
    ) {
        super(CONFIG_KEY, config);
    }
}