import { AfterViewInit, ComponentRef, Injector, Provider, ViewContainerRef, ViewChild, DoCheck } from '@angular/core';

import { first, last } from 'lodash';

import { ModelControl, ModelElement } from '../model/element';
import { ElementPosition }          from '../model/element.position';
import { ComponentInfo }            from './component.info';
import { ComponentManager }         from './component.manager';
import { DynamicControlContainer }  from './dynamic.control.container';
import { ElementData }              from './element.data';
import { FormElementComponent }     from './form.element.component';

export abstract class FormControlComponent<TModelControl extends ModelControl = ModelControl> extends FormElementComponent<TModelControl> implements AfterViewInit, DoCheck {

    @ViewChild('container', { read: ViewContainerRef }) public container: ViewContainerRef;

    protected controlManager: ComponentManager;
    private childComponents: ComponentInfo[] = [];

    constructor(
        elementData: ElementData,
        injector: Injector
    ) {
        super(elementData, injector);
        this.controlManager = this.injector.get(ComponentManager);
    }

    protected createChildComponents(): ComponentInfo[] {
        return [];
    };

    protected getControlContainer(container: ViewContainerRef = null): DynamicControlContainer {
        container = container || this.container || this.componentInfo.container;
        return {
            container,
            elementData: this.elementData,
            isRendered: this.isRendered.bind(this),
            addRenderOnParent: this.addRenderOnParent.bind(this),
            removeRenderOnParent: this.removeRenderOnParent.bind(this)
        };
    }

    protected createComponent(element: ModelElement, componentType: any, providers: Provider[]): ComponentInfo {
        return this.controlManager.createComponent(this.getControlContainer(), element, componentType, providers);
    }

    protected createHelpers(element: ModelControl, position: ElementPosition): ComponentInfo[] {
        return this.controlManager.createHelpers(this.getControlContainer(), element, position);
    }

    protected insertComponents(components: ComponentInfo[]): void {
        this.controlManager.insertComponents(...components);
        this.childComponents.push(...components);
    }

    protected insertComponentsBefore(targetComponent: ComponentInfo, components: ComponentInfo[]): void {
        this.controlManager.insertComponentsBefore(targetComponent, ...components);
        this.childComponents.push(...components);
    }

    protected insertComponentsAfter(targetComponent: ComponentInfo, components: ComponentInfo[]): void {
        this.controlManager.insertComponentsAfter(targetComponent, ...components);
        this.childComponents.push(...components);
    }

    ngDoCheck(): void {
        this.childComponents.forEach(child => {
            let instance = child.component.instance as FormElementComponent;

            let shouldRender = instance.isRendered(instance.checkedElement);
            let isRendered = !instance.isPlaceholder;

            if (shouldRender !== isRendered) {
                if (shouldRender) {
                    FormControlComponent.replaceChild(child, child.componentFactory);
                    this.addRenderOnParent(child.element.renderOnParent);
                } else {
                    FormControlComponent.replaceChild(child, child.placeholderFactory);
                    this.removeRenderOnParent(child.element.renderOnParent);
                }
            }
        });
    }

    private static replaceChild(child: ComponentInfo, replacementComponentFactory: () => ComponentRef<any>): void {
        let index = child.container.indexOf(child.component.hostView);
        child.container.remove(index);
        let replacement = replacementComponentFactory();
        child.component = replacement;
        child.container.insert(replacement.hostView, index);
    }

    ngAfterViewInit(): void {
        let createsHelpers = typeof this.elementData.createsHelpers === 'undefined' ? true : this.elementData.createsHelpers;
        let components = this.createChildComponents();
        this.insertComponents(components);
        if (this.element && createsHelpers) {
            this.insertComponentsBefore(first(components), this.createHelpers(this.element, ElementPosition.before));
            this.insertComponentsAfter(last(components), this.createHelpers(this.element, ElementPosition.after));
        }
    }

}