import { Inject, Injectable } from '@angular/core';

import { DYNAMIC_FORMS_CONFIG, DynamicFormsConfig } from '../dynamic.forms.config';

import { TypeMappingService } from '../type.mapping.service';

const CONFIG_KEY = 'elements';

export enum ButtonType {
    button = 'button',
    submit = 'submit'
}

@Injectable()
export class ButtonTypeMappings extends TypeMappingService<ButtonType> {
    constructor(
        @Inject(DYNAMIC_FORMS_CONFIG) config: DynamicFormsConfig
    ) {
        super(CONFIG_KEY, config);
    }
}