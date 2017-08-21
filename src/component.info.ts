import { ComponentRef, InjectionToken, TemplateRef, ViewContainerRef } from '@angular/core';

import { ModelControl }     from './model/control/model.control';
import { ElementHelper }    from './model/model.element';
import { PlaceholderComponent } from './placeholder.component';

export interface ComponentInfo {

    component: ComponentRef<any>;
    componentFactory: () => ComponentRef<any>
    placeholderFactory: () => ComponentRef<PlaceholderComponent>;
    control: ModelControl | ElementHelper;
    container: ViewContainerRef;

}

export const COMPONENT_INFO = new InjectionToken<ComponentInfo>('ComponentInfo');