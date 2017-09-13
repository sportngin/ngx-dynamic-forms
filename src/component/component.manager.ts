import { ComponentFactoryResolver, Injectable, Provider, ReflectiveInjector } from '@angular/core';

import { chain, extend } from 'lodash';

import { ElementPosition }                  from '../model';
import { ELEMENT_TIP, ModelElement, ModelElementTipPosition, ModelElementTipType, ModelControl } from '../model/element';
import { COMPONENT_INFO, ComponentInfo }    from './component.info';
import { DynamicControlContainer }          from './dynamic.control.container';
import { ElementData }                      from './element.data';
import { TipComponent }                     from './element/tip.component';
import { PlaceholderComponent }             from './placeholder.component';

@Injectable()
export class ComponentManager {

    constructor(
        private resolver: ComponentFactoryResolver
    ) {
    }

    public createComponent(containerComponent: DynamicControlContainer, element: ModelElement, componentType: any, providers: Provider[]): ComponentInfo {

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
        let isRendered = containerComponent.isRendered(element);
        let component = isRendered ? componentFactory() : placeholderFactory();

        return extend(info, {
            element,
            component,
            container: containerComponent.container,
            componentFactory,
            placeholderFactory,
            parent: containerComponent
        });
    }

    public createTips(containerComponent: DynamicControlContainer, element: ModelControl, tipType: ModelElementTipType, position: ModelElementTipPosition): ComponentInfo[] {
        return chain(element.tips)
            .filter(tip => tip.tipType === tipType && (tip.tipType === ModelElementTipType.tooltip || tip.position === position || tip.position === ElementPosition.both))
            .map(tip => {
                let providers = [
                    { provide: ELEMENT_TIP, useValue: tip },
                    { provide: ElementData, useValue: extend({}, containerComponent.elementData, { element }) }
                ];
                return this.createComponent(containerComponent, tip, TipComponent, providers);
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