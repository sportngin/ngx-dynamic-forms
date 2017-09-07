import { Inject, Injectable } from '@angular/core';

import { DYNAMIC_FORMS_CONFIG, DynamicFormsConfig } from '../dynamic.forms.config';

import { TypeMappingService }   from '../type.mapping.service';
import { ButtonType }           from './button.type';

const CONFIG_KEY = 'buttons';

@Injectable()
export class ButtonTypeMappings extends TypeMappingService<ButtonType> {
    constructor(
        @Inject(DYNAMIC_FORMS_CONFIG) config: DynamicFormsConfig
    ) {
        super(CONFIG_KEY, config);
    }
}