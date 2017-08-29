import { DynamicFormsConfig } from './dynamic.forms.config';

export abstract class TypeMappingService<TType extends string> {

    private mappings: { [type: string]: any } = {};

    constructor(
        configKey: string,
        config: DynamicFormsConfig
    ) {
        config.mappings[configKey].forEach(mapping => this.addMapping(mapping.type, mapping.component));
    }

    public addMapping(type: TType | string, component: any) {
        this.mappings[type] = component;
    }

    public getComponentType(type: TType | string): any {
        return this.mappings[type];
    }

}