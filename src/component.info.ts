import { ComponentRef, ViewContainerRef } from '@angular/core';

import { ModelControl }     from './model/control/model.control';
import { ElementHelper }    from './model/model.element';

export interface ComponentInfo {

    component: ComponentRef<any>;
    factory: () => ComponentRef<any>
    control: ModelControl | ElementHelper;
    rendered: boolean;
    container: ViewContainerRef;

}