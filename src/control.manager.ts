import { ComponentFactoryResolver, Injectable, Provider, ReflectiveInjector } from '@angular/core';

import { chain, extend } from 'lodash';

import { COMPONENT_INFO, ComponentInfo }    from './component.info';
import { DynamicControlContainer }          from './dynamic.control.container';
import { ElementData }                      from './elements/element.data';
import { HelperComponent }                  from './elements/helper.component';
import { ControlPosition }                  from './model/control.position';
import { ModelControl }                     from './model/control/model.control';
import { ELEMENT_HELPER, ElementHelper }    from './model/model.element';
import { PlaceholderComponent }             from './placeholder.component'

@Injectable()
export class ControlManager {

    constructor(
        private resolver: ComponentFactoryResolver
    ) {
    }

    public createComponent(containerComponent: DynamicControlContainer, control: ModelControl | ElementHelper, componentType: any, providers: Provider[]): ComponentInfo {

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

        return extend(info, {
            control,
            component,
            container: containerComponent.container,
            componentFactory,
            placeholderFactory,
            parent: containerComponent
        });
    }

    public createHelpers(containerComponent: DynamicControlContainer, control: ModelControl, position: ControlPosition): ComponentInfo[] {
        return chain(control.helpers)
            .filter(helper => (helper.position === position || helper.position === ControlPosition.both))
            .map(helper => {
                let providers = [
                    { provide: ELEMENT_HELPER, useValue: helper },
                    { provide: ElementData, useValue: extend({}, containerComponent.elementData, { control }) }
                ];
                return this.createComponent(containerComponent, helper, HelperComponent, providers);
            })
            .flatten()
            .value() as ComponentInfo[];
    }

    private insertComponent(componentInfo: ComponentInfo, index: number = null) {
        componentInfo.container.insert(componentInfo.component.hostView, index);
        componentInfo.component.hostView.detectChanges();
    }

    public insertComponentsBefore(target: ComponentInfo, ...components: ComponentInfo[]): void {
        components.forEach(child => {
            let targetIndex = target ? child.container.indexOf(target.component.hostView) : undefined;
            if (targetIndex < 0) {
                throw new Error('could not find target component in container');
            }
            this.insertComponent(child, targetIndex);
        });
    }

    public insertComponentsAfter(target: ComponentInfo, ...components: ComponentInfo[]): void {
        components.forEach(child => {
            let targetIndex = target ? child.container.indexOf(target.component.hostView) : undefined;
            if (targetIndex < 0) {
                throw new Error('could not find target component in container');
            }
            if (targetIndex !== null) {
                targetIndex++;
            }
            this.insertComponent(child, targetIndex);
        });
    }

    public insertComponents(...components: ComponentInfo[]): void {
        components.forEach(componentInfo => this.insertComponent(componentInfo));
    }

}