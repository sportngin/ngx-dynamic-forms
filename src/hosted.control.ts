import { AfterViewInit, ComponentRef, Injector, Provider, ViewContainerRef, ViewChild, DoCheck } from '@angular/core';

import { first, last } from 'lodash';

import { ComponentInfo }        from './component.info';
import { ControlManager }       from './control.manager';
import { DynamicControlContainer } from './dynamic.control.container';
import { ElementData }          from './elements/element.data';
import { HostedElement }        from './hosted.element';
import { ModelControl }         from './model/control/model.control';
import { ControlPosition }      from './model/control.position';
import { ElementHelper }        from './model/model.element';

export abstract class HostedControl<TModelControl extends ModelControl = ModelControl> extends HostedElement<TModelControl> implements AfterViewInit, DoCheck {

    @ViewChild('container', { read: ViewContainerRef }) public container: ViewContainerRef;

    protected controlManager: ControlManager;
    private childComponents: ComponentInfo[] = [];

    constructor(
        elementData: ElementData,
        injector: Injector
    ) {
        super(elementData, injector);
        this.controlManager = this.injector.get(ControlManager);
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

    protected createComponent(control: ModelControl | ElementHelper, componentType: any, providers: Provider[]): ComponentInfo {
        return this.controlManager.createComponent(this.getControlContainer(), control, componentType, providers);
    }

    protected createHelpers(control: ModelControl, position: ControlPosition): ComponentInfo[] {
        return this.controlManager.createHelpers(this.getControlContainer(), control, position);
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
            let instance = child.component.instance as HostedElement;

            let shouldRender = instance.isRendered(instance.checkedControl);
            let isRendered = !instance.isPlaceholder;

            if (shouldRender !== isRendered) {
                if (shouldRender) {
                    HostedControl.replaceChild(child, child.componentFactory);
                    this.addRenderOnParent(child.control.renderOnParent);
                } else {
                    HostedControl.replaceChild(child, child.placeholderFactory);
                    this.removeRenderOnParent(child.control.renderOnParent);
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
        if (this.control && createsHelpers) {
            this.insertComponentsBefore(first(components), this.createHelpers(this.control, ControlPosition.before));
        }
        this.insertComponents(components);
        if (this.control && createsHelpers) {
            this.insertComponentsAfter(last(components), this.createHelpers(this.control, ControlPosition.after));
        }
    }

}