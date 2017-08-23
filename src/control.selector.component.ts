import { AfterViewInit, Injector, Provider, ViewChild, ViewContainerRef } from '@angular/core';

import { ComponentInfo }        from './component.info';
import { ControlManager }       from './control.manager';
import { ElementData }          from './elements/element.data';
import { HostedElement }        from './hosted.element';
import { ModelControl }         from './model/control/model.control';
import { ElementHelper }        from './model/model.element';

export abstract class ControlSelectorComponent<TControl extends ModelControl = ModelControl> extends HostedElement<TControl> implements AfterViewInit {

    @ViewChild('container', { read: ViewContainerRef }) public container: ViewContainerRef;

    private controlManager: ControlManager;

    constructor(
        elementData: ElementData,
        injector: Injector
    ) {
        super(elementData, injector);

        this.controlManager = this.injector.get(ControlManager);
    }

    protected abstract createComponents(): ComponentInfo[];

    protected createComponent(control: ModelControl | ElementHelper, componentType: any, providers: Provider[], createHelpers: boolean = true): ComponentInfo[] {
        return this.controlManager.createComponent(this, control, componentType, providers, createHelpers);
    }

    public getProvidersFromInputData(inputData: { [key: string]: any }): Provider[] {
        return Object.keys(inputData).map(name => ({ provide: name, useValue: inputData[name] }));
    }

    ngAfterViewInit(): void {
        this.controlManager.insertComponents(
            ...this.createComponents()
        );
    }
}