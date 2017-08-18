import {
    Component, ComponentFactoryResolver, ComponentRef, DoCheck, Injector, Input, ViewEncapsulation
} from '@angular/core';

import { chain } from 'lodash';

import { ComponentInfo }            from '../component.info';
import { ControlSelectorComponent } from '../control.selector.component';
import { ElementType }              from '../element.type';
import { ElementTypeMappings }      from '../element.type.mappings';
import { FieldType }                from '../field.type';
import { FieldDisplayComponent }    from '../fields/field.display.component';
import { ControlPosition }          from '../model/control.position';
import { ELEMENT_HELPER }           from '../model/model.element';
import { MODEL_CONTROL_PROVIDER, ModelMemberControl } from '../model/control/model.control';
import { PlaceholderComponent }     from '../placeholder.component';
import { HelperComponent }          from './helper.component';

@Component({
    selector: 'form-element',
    templateUrl: './element.selector.component.pug',
    styleUrls: ['./element.selector.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ElementSelectorComponent extends ControlSelectorComponent implements DoCheck {

    @Input() displayOnly: boolean;

    private managedComponents: ComponentInfo[];

    constructor(
        resolver: ComponentFactoryResolver,
        private elementTypeMappings: ElementTypeMappings,
        injector: Injector
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

    protected createAndInsertComponents(): void {
        this.managedComponents = [
            ...this.createHelpers(ControlPosition.before),
            this.createControlComponent(),
            ...this.createHelpers(ControlPosition.after)
        ];
        this.insertComponents(...this.managedComponents);
    }

    private createHelpers(position: ControlPosition): ComponentInfo[] {
        return chain(this.control.helpers)
            .filter(helper => (helper.position === position || helper.position === ControlPosition.both))
            .map(helper => {
                let providers = [
                    { provide: ELEMENT_HELPER, useValue: helper }
                ];
                return this.createComponent(helper, HelperComponent, providers);
            })
            .value();
    }

    ngDoCheck(): void {
        if (!this.managedComponents) {
            return;
        }
        if (!this.controlsInserted) {
            setTimeout(() => this.ngDoCheck());
            return;
        }
        this.managedComponents.forEach(componentInfo => {
            let shouldRender = this.isRendered(componentInfo.control);
            if (componentInfo.rendered !== shouldRender) {
                this.replace(componentInfo, shouldRender ? componentInfo.factory : () => this.createPlaceholderComponent());
            }
        });
    }

    private replace(componentInfo: ComponentInfo, replacementFactory: () => ComponentRef<any>): void {
        let index = componentInfo.container.indexOf(componentInfo.component.hostView);
        componentInfo.component = replacementFactory();
        componentInfo.container.remove(index);
        componentInfo.container.insert(componentInfo.component.hostView, index);
        componentInfo.rendered = !componentInfo.rendered;
    }

    protected createPlaceholderComponent(): ComponentRef<PlaceholderComponent> {
        return this.resolver.resolveComponentFactory(PlaceholderComponent).create(this.container.parentInjector);
    }
}

// class PlaceholderViewRef extends ViewRef {
//
//     _view: any = {
//         def: {
//             nodes: []
//         },
//         renderer: {
//             parentNode: () => null,
//             nextSibling: () => null,
//
//         }
//     };
//
//     attachToViewContainerRef(x: any): void {
//     }
//
//     destroyed: boolean;
//
//     destroy(): void {
//     }
//
//     onDestroy(callback: Function): any {
//         return undefined;
//     }
//
//     markForCheck(): void {
//     }
//
//     detach(): void {
//     }
//
//     detectChanges(): void {
//     }
//
//     checkNoChanges(): void {
//     }
//
//     reattach(): void {
//     }
//
// }