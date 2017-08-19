import { Inject, Injectable } from '@angular/core';

import { DYNAMIC_FORMS_CONFIG, DynamicFormsConfig } from './dynamic.forms.config';

import { FieldType }            from './field.type';
import { TypeMappingService }   from './type.mapping.service';

const CONFIG_KEY: string = 'fields';

@Injectable()
export class FieldTypeMappings extends TypeMappingService<FieldType> {
    constructor(
        @Inject(DYNAMIC_FORMS_CONFIG) config: DynamicFormsConfig
    ) {
        super(CONFIG_KEY, config);
    }
}