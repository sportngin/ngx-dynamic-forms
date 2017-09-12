import { ComponentRef, InjectionToken, ViewContainerRef } from '@angular/core';

import { DynamicControlContainer } from './dynamic.control.container';
import { ModelControl }         from './model/control/model.control';
import { ElementHelper }        from './model/model.element';
import { PlaceholderComponent } from './placeholder.component';

export interface ComponentInfo {

    component: ComponentRef<any>;
    componentFactory: () => ComponentRef<any>
    placeholderFactory: () => ComponentRef<PlaceholderComponent>;
    control: ModelControl | ElementHelper;
    container: ViewContainerRef;
    parent: DynamicControlContainer;

}

export const COMPONENT_INFO = new InjectionToken<ComponentInfo>('ComponentInfo');