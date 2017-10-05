import { ComponentRef, InjectionToken, ViewContainerRef } from '@angular/core';

import { ModelElement }             from '../model/element/model.element';
import { DynamicControlContainer }  from './dynamic.control.container';
import { PlaceholderComponent }     from './placeholder.component';

export interface ComponentInfo {

    component: ComponentRef<any>;
    componentFactory: () => ComponentRef<any>
    placeholderFactory: () => ComponentRef<PlaceholderComponent>;
    element: ModelElement;
    container: ViewContainerRef;
    parent: DynamicControlContainer;

}

export const COMPONENT_INFO = new InjectionToken<ComponentInfo>('ComponentInfo');