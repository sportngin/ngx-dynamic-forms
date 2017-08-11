import { Inject, Injectable, Optional } from '@angular/core';

import { DYNAMIC_FORMS_CONFIG, DynamicFormsConfig } from '../dynamic.forms.config';

import { ButtonComponent }          from './button.component';
import { SubmitButtonComponent}     from './submit.button.component'


import { TypeMappingService }       from '../type.mapping.service';

const CONFIG_KEY = 'elements';

export enum ButtonType {
    button = 'button',
    submit = 'submit'
}

@Injectable()
export class ButtonTypeMappings extends TypeMappingService<ButtonType> {

    protected get configKey() { return CONFIG_KEY; }

    constructor(@Optional() @Inject(DYNAMIC_FORMS_CONFIG) config: DynamicFormsConfig) {
        super(config);
    }

    protected addStaticMappings(): void {
        this.addMapping(ButtonType.button, ButtonComponent);
        this.addMapping(ButtonType.submit, SubmitButtonComponent);
    }
}