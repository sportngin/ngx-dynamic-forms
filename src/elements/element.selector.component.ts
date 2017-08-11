import { Component, ComponentFactoryResolver, Injector, Input } from '@angular/core';

import { BehaviorService }          from '../behavior/behavior.service';
import { ControlSelectorComponent } from '../control.selector.component';
import { ElementTypeMappings }      from '../element.type.mappings';
import { MODEL_CONTROL_PROVIDER }   from '../model/control/model.control';

@Component({
    selector: 'element-selector',
    templateUrl: '../control.selector.pug'
})
export class ElementSelectorComponent extends ControlSelectorComponent {

    @Input() displayOnly: boolean = false;

    constructor(
        resolver: ComponentFactoryResolver,
        private elementTypeMappings: ElementTypeMappings,
        injector: Injector,
        behaviorService: BehaviorService
    ) {
        super(null, resolver, MODEL_CONTROL_PROVIDER, injector, behaviorService);
    }

    protected getControlComponentType() {
        return this.elementTypeMappings.getComponentType(this.control.elementType);
    }

    protected getInputData(): { [key: string]: any; } {
        return {
            form: this.form,
            control: this.control,
            displayOnly: this.displayOnly
        };
    }

}