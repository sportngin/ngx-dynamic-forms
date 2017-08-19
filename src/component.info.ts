import { ComponentRef, InjectionToken, TemplateRef, ViewContainerRef } from '@angular/core';

import { ModelControl }     from './model/control/model.control';
import { ElementHelper }    from './model/model.element';
import { PlaceholderComponent } from './placeholder.component';

export interface ComponentInfo {

    component: ComponentRef<TemplatedComponent>;
    control: ModelControl | ElementHelper;
    container: ViewContainerRef;
    placeholder: ComponentRef<PlaceholderComponent>;

}

export interface TemplatedComponent {
    template: TemplateRef<any>
}

export const COMPONENT_INFO = new InjectionToken<ComponentInfo>('ComponentInfo');