import {
    ComponentFactoryResolver, InjectionToken, Injector, Input, OnInit, Provider, ReflectiveInjector, Type, ViewChild,
    ViewContainerRef
} from '@angular/core';
import { FormGroup } from '@angular/forms';

import { extend, omit } from 'lodash';

import { BehaviorService } from './behavior/behavior.service';
import { FormElement }  from './form.element';
import { ModelControl } from './model/control/model.control';

export abstract class ControlSelectorComponent<TControl extends ModelControl = ModelControl> extends FormElement implements OnInit {

    @ViewChild('container', { read: ViewContainerRef }) public container: ViewContainerRef;

    @Input() public form: FormGroup;
    @Input() public control: TControl;

    constructor(
        form: FormGroup,
        protected resolver: ComponentFactoryResolver,
        private modelControlType: Type<TControl> | InjectionToken<TControl>,
        injector: Injector,
        behaviorService: BehaviorService
    ) {
        super(form, injector, behaviorService);
    }

    ngOnInit(): void {
        console.log(`${this.constructor.name}.ngOnInit this.control`, this.control);

        this.init();
    }

    private init(): void {
        let mergedInputData = omit(extend(this.getInputData(), this.control.member.data || {}), 'form', 'control');
        console.log(`${this.constructor.name}.init mergedInputData`, mergedInputData);

        let inputProviders: Provider[] = Object.keys(mergedInputData).map(name => ({ provide: name, useValue: mergedInputData[name] }));
        inputProviders.push(
            { provide: FormGroup, useValue: this.form },
            { provide: this.modelControlType, useValue: this.control },
            ...this.getInputProviders()
        );
        console.log(`${this.constructor.name}.init inputProviders`, inputProviders);

        let resolvedInputs = ReflectiveInjector.resolve(inputProviders);
        console.log(`${this.constructor.name}.init resolvedInputs`, resolvedInputs);

        let injector = ReflectiveInjector.fromResolvedProviders(resolvedInputs, this.container.parentInjector);

        let componentType = this.getControlComponentType();
        let factory = this.resolver.resolveComponentFactory(componentType);
        let componentInstance = factory.create(injector);

        this.container.insert(componentInstance.hostView);
    }

    protected abstract getControlComponentType(): any;

    protected abstract getInputData(): { [key: string]: any };

    protected getInputProviders(): Provider[] {
        return [];
    }
}