import {
    AfterContentInit,
    ComponentFactoryResolver, InjectionToken, Injector, Input, OnInit, Provider, ReflectiveInjector, Type, ViewChild,
    ViewContainerRef
} from '@angular/core';
import { FormGroup } from '@angular/forms';

import { extend, omit } from 'lodash';

import { ELEMENT_DATA } from './elements/element.data';
import { FormElement }  from './form.element';
import { ModelControl } from './model/control/model.control';
import { VIEW_CONTAINER_ACCESSOR } from './view.container.accessor';

export abstract class ControlSelectorComponent<TControl extends ModelControl = ModelControl> extends FormElement implements AfterContentInit {

    @ViewChild('container', { read: ViewContainerRef }) public container: ViewContainerRef;

    @Input() public form: FormGroup;
    @Input() public control: TControl;

    constructor(
        form: FormGroup,
        protected resolver: ComponentFactoryResolver,
        private modelControlType: Type<TControl> | InjectionToken<TControl>,
        injector: Injector
    ) {
        super(null, injector);

        this.form = form;
    }

    ngAfterContentInit(): void {
        this.init();
    }

    private init(): void {
        let elementData = this.getElementData();
        let mergedInputData = omit(extend(elementData, this.control.member.data || {}), 'form', 'control');

        let inputProviders: Provider[] = Object.keys(mergedInputData).map(name => ({ provide: name, useValue: mergedInputData[name] }));
        inputProviders.push(
            { provide: FormGroup, useValue: this.form },
            { provide: this.modelControlType, useValue: this.control },
            { provide: ELEMENT_DATA, useValue: elementData },
            ...this.getInputProviders()
        );

        let resolvedInputs = ReflectiveInjector.resolve(inputProviders);

        let injector = ReflectiveInjector.fromResolvedProviders(resolvedInputs, this.container.parentInjector);

        let componentType = this.getControlComponentType();
        let factory = this.resolver.resolveComponentFactory(componentType);
        let componentInstance = factory.create(injector);

        let targetContainerAccessor = this.injector.get(VIEW_CONTAINER_ACCESSOR);
        setTimeout(() => targetContainerAccessor.container.insert(componentInstance.hostView));
    }

    protected abstract getControlComponentType(): any;

    protected abstract getElementData(): { [key: string]: any };

    protected getInputProviders(): Provider[] {
        return [];
    }
}