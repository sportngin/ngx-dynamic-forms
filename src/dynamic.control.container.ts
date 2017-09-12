import { ViewContainerRef } from '@angular/core';

import { ElementData }                      from './elements/element.data';
import { ModelControl }                     from './model/control/model.control';
import { ElementHelper, RenderOnParent }    from './model/model.element';

export interface DynamicControlContainer {
    container: ViewContainerRef;
    elementData: ElementData;
    isRendered(control: ModelControl | ElementHelper): boolean;
    addRenderOnParent(renderOnParent: RenderOnParent[]): void;
    removeRenderOnParent(renderOnParent: RenderOnParent[]): void;
}