import { AfterViewInit, Injector, Provider, ViewChild, ViewContainerRef } from '@angular/core';

import { ComponentInfo }        from './component.info';
import { ControlManager, DynamicControlContainer } from './control.manager';
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
            isRendered: this.isRendered.bind(this)
        };
    }

    protected createComponent(control: ModelControl | ElementHelper, componentType: any, providers: Provider[]): ComponentInfo {
        return this.controlManager.createComponent(this.getControlContainer(), control, componentType, providers);
    }

    protected createHelpers(control: ModelControl, position: ControlPosition): ComponentInfo[] {
        return this.controlManager.createHelpers(this.getControlContainer(this.componentInfo.container), control, position);
    }

    protected insertComponents(components: ComponentInfo[]): void {
        this.controlManager.insertComponents(...components)
    }

    protected insertComponentsBefore(components: ComponentInfo[]): void {
        this.controlManager.insertComponentsBefore(this.componentInfo, ...components);
    }

    protected insertComponentsAfter(components: ComponentInfo[]): void {
        this.controlManager.insertComponentsAfter(this.componentInfo, ...components);
    }

    ngAfterViewInit(): void {
        let createsHelpers = typeof this.elementData.createsHelpers === 'undefined' ? true : this.elementData.createsHelpers;
        if (this.control && createsHelpers) {
            this.insertComponentsBefore(this.createHelpers(this.control, ControlPosition.before));
        }
        this.insertComponents(this.createChildComponents());
        if (this.control && createsHelpers) {
            this.insertComponentsAfter(this.createHelpers(this.control, ControlPosition.after));
        }
    }

}