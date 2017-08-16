import {
    Component, ComponentFactoryResolver, ElementRef, Injector,
    Input, Renderer2, ViewEncapsulation
} from '@angular/core';

import { ControlSelectorComponent } from '../control.selector.component';
import { ElementType }              from '../element.type';
import { ElementTypeMappings }      from '../element.type.mappings';
import { FieldType }                from '../field.type';
import { FieldDisplayComponent }    from '../fields/field.display.component';
import { MODEL_CONTROL_PROVIDER, ModelMemberControl } from '../model/control/model.control';
import { INPUT_CONTAINER_PROVIDER, InputContainer } from './input.container';

@Component({
    selector: 'form-element',
    templateUrl: './element.selector.component.pug',
    styleUrls: ['./element.selector.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [
        { provide: INPUT_CONTAINER_PROVIDER, useExisting: ElementSelectorComponent }
    ]
})
export class ElementSelectorComponent extends ControlSelectorComponent implements InputContainer {

    @Input() displayOnly: boolean;

    private classMap: { [name: string]: boolean } = {};

    constructor(
        resolver: ComponentFactoryResolver,
        private elementTypeMappings: ElementTypeMappings,
        injector: Injector,
        private renderer: Renderer2,
        private elementRef: ElementRef
    ) {
        super(null, resolver, MODEL_CONTROL_PROVIDER, injector);
    }

    protected getControlComponentType(): any {
        if (this.control.elementType === ElementType.input && this.displayOnly && (this.control as ModelMemberControl).fieldType !== FieldType.hidden) {
            return FieldDisplayComponent;
        }
        return this.elementTypeMappings.getComponentType(this.control.elementType);
    }

    protected getElementData(): { [key: string]: any; } {
        return {
            form: this.form,
            control: this.control,
            displayOnly: this.displayOnly
        };
    }

    public addCssClass(cssClass: string): void {
        if (this.classMap[cssClass]) {
            return;
        }
        this.renderer.addClass(this.elementRef.nativeElement, cssClass);
        this.classMap[cssClass] = true;
    }

    public removeCssClass(cssClass: string): void {
        if (!this.classMap[cssClass]) {
            return;
        }
        this.renderer.removeClass(this.elementRef.nativeElement, cssClass);
        this.classMap[cssClass] = false;
    }

}