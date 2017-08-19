import {
    AfterViewInit, ComponentFactoryResolver, Injector, Provider, ReflectiveInjector, ViewChild, ViewContainerRef
} from '@angular/core';
import { FormGroup } from '@angular/forms';

import { chain, extend } from 'lodash';

import { COMPONENT_INFO, ComponentInfo } from './component.info';
import { ElementData }      from './elements/element.data';
import { HelperComponent }  from './elements/helper.component';
import { ModelControl }     from './model/control/model.control';
import { HostedElement }    from './hosted.element';
import { ELEMENT_HELPER, ElementHelper } from './model/model.element';
import { ControlPosition }  from './model/control.position';

export abstract class ControlSelectorComponent<TControl extends ModelControl = ModelControl> extends HostedElement<TControl> implements AfterViewInit {

    @ViewChild('container', { read: ViewContainerRef }) public container: ViewContainerRef;

    private resolver: ComponentFactoryResolver;

    constructor(
        elementData: ElementData,
        injector: Injector
    ) {
        super(elementData, injector);

        this.resolver = this.injector.get(ComponentFactoryResolver);
    }

    protected abstract createComponents(): ComponentInfo[];

    protected getProvidersFromInputData(inputData: { [key: string]: any }): Provider[] {
        return Object.keys(inputData).map(name => ({ provide: name, useValue: inputData[name] }));
    }

    protected createComponent(control: ModelControl | ElementHelper, componentType: any, providers: Provider[], createHelpers: boolean = true): ComponentInfo[] {

        let info: any = {};
        providers.push(
            { provide: COMPONENT_INFO, useValue: info },
            { provide: FormGroup, useValue: this.form },
        );
        let resolvedInputs = ReflectiveInjector.resolve(providers);
        let injector = ReflectiveInjector.fromResolvedProviders(resolvedInputs, this.container.parentInjector);
        let componentFactory = this.resolver.resolveComponentFactory(componentType);
        let component = componentFactory.create(injector);

        extend(info, { control, component, container: this.container });

        if (!createHelpers || componentType === HelperComponent) {
            return [info];
        }
        return [
            ...this.createHelpers(control as ModelControl, ControlPosition.before),
            info,
            ...this.createHelpers(control as ModelControl, ControlPosition.after)
        ];
    }

    private createHelpers(control: ModelControl, position: ControlPosition): ComponentInfo[] {
        return chain(control.helpers)
            .filter(helper => (helper.position === position || helper.position === ControlPosition.both))
            .map(helper => {
                let providers = [
                    { provide: ELEMENT_HELPER, useValue: helper }
                ];
                return this.createComponent(helper, HelperComponent, providers);
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

    ngAfterViewInit(): void {
        this.insertComponents(
            ...this.createComponents()
        );
    }
}