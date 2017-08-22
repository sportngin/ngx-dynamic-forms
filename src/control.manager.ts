import {
    ComponentFactoryResolver, Inject, Injectable, Optional, Provider, ReflectiveInjector
} from '@angular/core';

import { chain, extend } from 'lodash';

import { COMPONENT_INFO, ComponentInfo }    from './component.info';
import { ControlSelectorComponent }         from './control.selector.component';
import { ELEMENT_DATA }                     from './elements/element.data';
import { HelperComponent }                  from './elements/helper.component';
import { ControlPosition }                  from './model/control.position';
import { ModelControl }                     from './model/control/model.control';
import { ELEMENT_HELPER, ElementHelper }    from './model/model.element';
import { PlaceholderComponent }             from './placeholder.component';

@Injectable()
export class ControlManager {

    constructor(
        private resolver: ComponentFactoryResolver
    ) {
    }

    public createComponent(parentComponent: ControlSelectorComponent, control: ModelControl | ElementHelper, componentType: any, providers: Provider[], createHelpers: boolean = true): ComponentInfo[] {

        // console.log(`${this.constructor.name}.createComponent`, control, componentType, providers);

        let info: any = {};
        providers.push(
            { provide: COMPONENT_INFO, useValue: info }
        );
        let resolvedInputs = ReflectiveInjector.resolve(providers);
        let injector = ReflectiveInjector.fromResolvedProviders(resolvedInputs, parentComponent.container.parentInjector);
        let resolvedComponentFactory = this.resolver.resolveComponentFactory(componentType);
        let resolvedPlaceholderFactory = this.resolver.resolveComponentFactory(PlaceholderComponent);
        let componentFactory = () => resolvedComponentFactory.create(injector);
        let placeholderFactory = () => resolvedPlaceholderFactory.create(injector);
        let isRendered = parentComponent.isRendered(control);
        let component = isRendered ? componentFactory() : placeholderFactory();

        extend(info, { control, component, container: parentComponent.container, componentFactory, placeholderFactory });

        if (!createHelpers || componentType === HelperComponent) {
            return [info];
        }
        return [
            ...this.createHelpers(parentComponent, control as ModelControl, ControlPosition.before),
            info,
            ...this.createHelpers(parentComponent, control as ModelControl, ControlPosition.after)
        ];
    }

    private createHelpers(parentComponent: ControlSelectorComponent, control: ModelControl, position: ControlPosition): ComponentInfo[] {
        return chain(control.helpers)
            .filter(helper => (helper.position === position || helper.position === ControlPosition.both))
            .map(helper => {
                let providers = [
                    { provide: ELEMENT_HELPER, useValue: helper },
                    { provide: ELEMENT_DATA, useValue: parentComponent.elementData }
                ];
                return this.createComponent(parentComponent, helper, HelperComponent, providers);
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
        //         } else {
        //             console.warn('already destroyed!', componentInfo.control);
        //         }
        //     });
        // });
    }

}