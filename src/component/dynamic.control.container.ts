import { ViewContainerRef } from '@angular/core';

import { RenderOnParent }   from '../model';
import { ModelElement }     from '../model/element';
import { ElementData }      from './element.data';

export interface DynamicControlContainer {
    container: ViewContainerRef;
    elementData: ElementData;
    isRendered(element: ModelElement): boolean;
    addRenderOnParent(renderOnParent: RenderOnParent[]): void;
    removeRenderOnParent(renderOnParent: RenderOnParent[]): void;
}