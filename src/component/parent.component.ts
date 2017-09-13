import { Injector } from '@angular/core';

import { ElementTypeMappings }      from '../config/element.type.mappings';
import { ElementType, ModelControl, ModelElement } from '../model/element';
import { MemberType, ModelMember }  from '../model/member';
import { ElementData }              from './element.data';
import { MemberDisplayComponent }   from './element/member.display.component';
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
        if (element.elementType === ElementType.input && this.displayOnly && (element as ModelMember).memberType !== MemberType.hidden) {
            return MemberDisplayComponent;
        }
        return this.elementTypeMappings.getComponentType(element.elementType);
    }

    protected getElementData(element: ModelElement): { [key: string]: any; } {
        return {
            form: this.form,
            element: element,
            displayOnly: this.displayOnly
        };
    }

}