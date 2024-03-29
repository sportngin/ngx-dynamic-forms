import {
    ComponentFactoryResolver, Injectable, Inject, Injector, StaticProvider,
} from '@angular/core';

import { extend, flatten, mergeWith } from 'lodash-es';

import { DYNAMIC_FORMS_CONFIG, DynamicFormsConfig, ElementTypeMappings } from '../config';
import { ElementType, ModelElement, ModelElementSibling, ModelElementSiblingPosition, optionsMerge } from '../model/element';
import { ElementSiblingPosition, isAbsolutePosition } from '../model';
import { COMPONENT_INFO, ComponentInfo }    from './component.info';
import { DynamicControlContainer }          from './dynamic.control.container';
import { ElementData }                      from './element.data';

@Injectable()
export class ComponentManager {

    private placeholderComponentType: any;

    constructor(
        private resolver: ComponentFactoryResolver,
        @Inject(DYNAMIC_FORMS_CONFIG) private config: DynamicFormsConfig,
        private elementTypeMappings: ElementTypeMappings,
    ) {
        this.placeholderComponentType = this.elementTypeMappings.getComponentType(ElementType.placeholder)
    }

    private mergeOptionsConfig<TModelElement extends ModelElement>(element: TModelElement): TModelElement {
        if (!element['__mergedConfig']) {
            let defaultOptions = element.optionsConfigKeys.map(key => this.config.defaultOptions[key]);
            if (defaultOptions) {
                mergeWith(element, ...defaultOptions, element, optionsMerge);
            }
            element['__mergedConfig'] = true;
        }
        return element;
    }

    public createComponent(containerComponent: DynamicControlContainer, element: ModelElement, componentType: any, providers: StaticProvider[]): ComponentInfo {

        let info: any = {};
        this.mergeOptionsConfig(element);
        providers.push(
            { provide: COMPONENT_INFO, useValue: info }
        );
        const injector = Injector.create({
            providers,
            parent: containerComponent.container.parentInjector
        });
        let resolvedComponentFactory = this.resolver.resolveComponentFactory(componentType);
        let resolvedPlaceholderFactory = this.resolver.resolveComponentFactory(this.placeholderComponentType);
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

    public createSiblings(containerComponent: DynamicControlContainer, siblings: ModelElementSibling[], absolutelyPositioned: boolean, position: ModelElementSiblingPosition): ComponentInfo[] {
        if (!siblings) {
            return [];
        }
        return flatten(siblings
            .map(sibling => this.mergeOptionsConfig(sibling))
            .filter(sibling =>
                (sibling.position === position || sibling.position === ElementSiblingPosition.both) ||
                (absolutelyPositioned && isAbsolutePosition(sibling.position)))
            .map(sibling => {
                let providers: StaticProvider[] = [
                    { provide: ElementData, useValue: extend({}, containerComponent.elementData, { element: sibling }) }
                ];
                let componentType = this.elementTypeMappings.getComponentType(sibling.elementType);
                return this.createComponent(containerComponent, sibling, componentType, providers);
            }));
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
