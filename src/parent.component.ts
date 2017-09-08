import { Injector } from '@angular/core';

import { ElementType }                      from './element.type';
import { ElementTypeMappings }              from './element.type.mappings';
import { ElementData }                      from './elements/element.data';
import { FieldType }                        from './field.type';
import { FieldDisplayComponent }            from './fields/field.display.component';
import { HostedControl }                    from './hosted.control';
import { ModelControl, ModelMemberControl } from './model/control/model.control';

export const TEMPLATE: string = '<ng-container #container></ng-container>';

export abstract class ParentComponent<TControl extends ModelControl> extends HostedControl<TControl> {

    private elementTypeMappings: ElementTypeMappings;

    constructor(
        elementData: ElementData,
        injector: Injector
    ) {
        super(elementData, injector);

        this.elementTypeMappings = injector.get(ElementTypeMappings);
    }

    protected getComponentType(control: ModelControl | ModelMemberControl): any {
        if (control.elementType === ElementType.input && this.displayOnly && (control as ModelMemberControl).fieldType !== FieldType.hidden) {
            return FieldDisplayComponent;
        }
        return this.elementTypeMappings.getComponentType(control.elementType);
    }

    protected getElementData(control: ModelControl): { [key: string]: any; } {
        return {
            form: this.form,
            control: control,
            displayOnly: this.displayOnly
        };
    }

}