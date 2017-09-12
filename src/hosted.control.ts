import { AfterViewInit, Injector, Provider, ViewChild, ViewContainerRef } from '@angular/core';

import { first, last } from 'lodash';

import { ComponentInfo }        from './component.info';
import { ControlManager }       from './control.manager';
import { DynamicControlContainer } from './dynamic.control.container';
import { ElementData }          from './elements/element.data';
import { HostedElement }        from './hosted.element';
import { ModelControl }         from './model/control/model.control';
import { ControlPosition }      from './model/control.position';
import { ElementHelper }        from './model/model.element';

export abstract class HostedControl<TModelControl extends ModelControl = ModelControl> extends HostedElement<TModelControl> implements AfterViewInit {

    @ViewChild('container', { read: ViewContainerRef }) public container: ViewContainerRef;

    protected controlManager: ControlManager;

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
        container = container || this['container'] || this.componentInfo.container;
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
        this.controlManager.insertComponents(...components)
    }

    protected insertComponentsBefore(targetComponent: ComponentInfo, components: ComponentInfo[]): void {
        this.controlManager.insertComponentsBefore(targetComponent, ...components);
    }

    protected insertComponentsAfter(targetComponent: ComponentInfo, components: ComponentInfo[]): void {
        this.controlManager.insertComponentsAfter(targetComponent, ...components);
    }

    ngAfterViewInit(): void {
        let createsHelpers = typeof this.elementData.createsHelpers === 'undefined' ? true : this.elementData.createsHelpers;
        let components = this.createChildComponents();
        if (this.control && createsHelpers) {
            // let targetComponent = first(components) || this.componentInfo;
            this.insertComponentsBefore(first(components), this.createHelpers(this.control, ControlPosition.before));
        }
        this.insertComponents(components);
        if (this.control && createsHelpers) {
            // let targetComponent = last(components) || this.componentInfo;
            this.insertComponentsAfter(last(components), this.createHelpers(this.control, ControlPosition.after));
        }
    }

}