import { Inject, Optional } from '@angular/core';

import { DYNAMIC_FORMS_CONFIG, DynamicFormsConfig } from './dynamic.forms.config';

export abstract class TypeMappingService<TType extends string> {

    private mappings: { [type: string]: any } = {};

    constructor(
        @Optional() @Inject(DYNAMIC_FORMS_CONFIG) protected config: DynamicFormsConfig
    ) {
        this.addStaticMappings();

        if (config && config[this.configKey]) {
            config[this.configKey].forEach(mapping => this.addMapping(mapping.type, mapping.component));
        }
    }

    protected abstract addStaticMappings(): void;

    protected abstract get configKey(): string;

    public addMapping(type: TType | string, component: any) {
        this.mappings[type] = component;
    }

    public getComponentType(type: TType | string): any {
        return this.mappings[type];
    }

}