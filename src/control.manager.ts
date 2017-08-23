import {
    ComponentFactoryResolver, Injectable, Provider, ReflectiveInjector, ViewContainerRef
} from '@angular/core';

import { chain, extend } from 'lodash';

import { COMPONENT_INFO, ComponentInfo }    from './component.info';
import { ELEMENT_DATA, ElementData }        from './elements/element.data';
import { HelperComponent }                  from './elements/helper.component';
import { ControlPosition }                  from './model/control.position';
import { ModelControl }                     from './model/control/model.control';
import { ELEMENT_HELPER, ElementHelper }    from './model/model.element';
import { PlaceholderComponent }             from './placeholder.component';

export interface DynamicControlContainer {
    container: ViewContainerRef;
    elementData: ElementData;
    isRendered(control: ModelControl | ElementHelper): boolean;
}

@Injectable()
export class ControlManager {

    constructor(
        private resolver: ComponentFactoryResolver
    ) {
    }

    public createComponent(containerComponent: DynamicControlContainer, control: ModelControl | ElementHelper, componentType: any, providers: Provider[], createHelpers: boolean = true): ComponentInfo[] {

        let info: any = {};
        providers.push(
            { provide: COMPONENT_INFO, useValue: info }
        );
        let resolvedInputs = ReflectiveInjector.resolve(providers);
        let injector = ReflectiveInjector.fromResolvedProviders(resolvedInputs, containerComponent.container.parentInjector);
        let resolvedComponentFactory = this.resolver.resolveComponentFactory(componentType);
        let resolvedPlaceholderFactory = this.resolver.resolveComponentFactory(PlaceholderComponent);
        let componentFactory = () => resolvedComponentFactory.create(injector);
        let placeholderFactory = () => resolvedPlaceholderFactory.create(injector);
        let isRendered = containerComponent.isRendered(control);
        let component = isRendered ? componentFactory() : placeholderFactory();

        extend(info, { control, component, container: containerComponent.container, componentFactory, placeholderFactory });

        if (!createHelpers || componentType === HelperComponent) {
            return [info];
        }
        return [
            ...this.createHelpers(containerComponent, control as ModelControl, ControlPosition.before),
            info,
            ...this.createHelpers(containerComponent, control as ModelControl, ControlPosition.after)
        ];
    }

    private createHelpers(containerComponent: DynamicControlContainer, control: ModelControl, position: ControlPosition): ComponentInfo[] {
        return chain(control.helpers)
            .filter(helper => (helper.position === position || helper.position === ControlPosition.both))
            .map(helper => {
                // TODO: replace with providers from createComponent call?
                let providers = [
                    { provide: ELEMENT_HELPER, useValue: helper },
                    { provide: ELEMENT_DATA, useValue: containerComponent.elementData }
                ];
                return this.createComponent(containerComponent, helper, HelperComponent, providers);
            })
            .flatten()
            .value() as ComponentInfo[];
    }

    public insertComponents(...components: ComponentInfo[]): void {
        components.forEach(componentInfo => {
            // componentInfo.component.hostView.detach();
            componentInfo.container.insert(componentInfo.component.hostView);
            componentInfo.component.hostView.detectChanges();
        });

        // setTimeout(() => {
        //     components.forEach(componentInfo => {
        //         if (!componentInfo.component.hostView.destroyed) {
        //             componentInfo.component.hostView.reattach();
        //         }
        //     });
        // });
    }

}