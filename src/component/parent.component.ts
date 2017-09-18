import { Injector } from '@angular/core';

import { extend } from 'lodash';

import { ElementTypeMappings }      from '../config';
import { ElementType, ModelControl, ModelElement } from '../model/element';
import { MemberType, ModelMember }  from '../model/member';
import { ElementData }              from './element.data';
import { ElementRenderMode }        from './element.render.mode';
import { MemberDisplayComponent }   from './element/member.display.component';
import { MemberLabelComponent }     from './element/member.label.component';
import { FormControlComponent }     from './form.control.component';

export const TEMPLATE: string = '<ng-container #container></ng-container>';

export abstract class ParentComponent<TModelControl extends ModelControl = ModelControl> extends FormControlComponent<TModelControl> {

    private elementTypeMappings: ElementTypeMappings;

    constructor(
        elementData: ElementData,
        injector: Injector
    ) {
        super(elementData, injector);

        this.elementTypeMappings = injector.get(ElementTypeMappings);
    }

    protected getComponentType(element: ModelElement): any {
        if (element.elementType === ElementType.input) {
            let memberType = (element as ModelMember).memberType;
            if (this.renderMode === ElementRenderMode.displayOnly && memberType !== MemberType.hidden) {
                return MemberDisplayComponent;
            }
            if (this.renderMode === ElementRenderMode.labelOnly) {
                if (memberType === MemberType.hidden) {
                    return null;
                }
                return MemberLabelComponent;
            }
        }
        return this.elementTypeMappings.getComponentType(element.elementType);
    }

    protected getElementData(element: ModelElement): { [key: string]: any; } {
        return extend({}, this.elementData, { element });
    }

}