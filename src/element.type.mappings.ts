import { Inject, Injectable, Optional } from '@angular/core';

import { DYNAMIC_FORMS_CONFIG, DynamicFormsConfig } from './dynamic.forms.config';

import { ButtonComponent }          from './elements/button.component';
import { LayoutComponent }          from './elements/layout.component';
import { FormPageComponent }        from './elements/form.page.component';
import { FormPageRootComponent }    from './elements/form.page.root.component';

import { DynamicInputComponent }    from './fields/dynamic.input.component';

import { ElementType }              from './element.type';
import { TypeMappingService }       from './type.mapping.service';

const CONFIG_KEY = 'elements';


@Injectable()
export class ElementTypeMappings extends TypeMappingService<ElementType> {

    protected get configKey() { return CONFIG_KEY; }

    constructor(@Optional() @Inject(DYNAMIC_FORMS_CONFIG) config: DynamicFormsConfig) {
        super(config);
    }

    protected addStaticMappings(): void {
        this.addMapping(ElementType.button, ButtonComponent);
        this.addMapping(ElementType.input, DynamicInputComponent);
        this.addMapping(ElementType.layout, LayoutComponent);
        this.addMapping(ElementType.page, FormPageComponent);
        this.addMapping(ElementType.pageRoot, FormPageRootComponent);
    }
}