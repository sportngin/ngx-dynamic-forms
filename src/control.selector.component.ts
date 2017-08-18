import {
    AfterContentInit, ComponentFactoryResolver, InjectionToken, Injector, Input, Provider,
    ReflectiveInjector, Type, ViewChild, ViewContainerRef
} from '@angular/core';
import { FormGroup } from '@angular/forms';

import { extend, omit } from 'lodash';

import { ComponentInfo }    from './component.info';
import { ELEMENT_DATA }     from './elements/element.data';
import { FormElement }      from './form.element';
import { ModelControl }     from './model/control/model.control';
import { ElementHelper }    from './model/model.element';
import { VIEW_CONTAINER_ACCESSOR } from './view.container.accessor';

export abstract class ControlSelectorComponent<TControl extends ModelControl = ModelControl> extends FormElement implements AfterContentInit {

    @ViewChild('container', { read: ViewContainerRef }) public container: ViewContainerRef;

    @Input() public form: FormGroup;
    @Input() public set control(control: TControl) {
        this._control = control;
    }
    public get control(): TControl {
        return this._control;
    }

    private _control: TControl;
    private _targetContainer: ViewContainerRef;

    private get targetContainer(): ViewContainerRef {
        if (!this._targetContainer) {
            let targetContainerAccessor = this.injector.get(VIEW_CONTAINER_ACCESSOR);
            this._targetContainer = targetContainerAccessor.container;
        }
        return this._targetContainer;
    }

    protected controlsInserted: boolean = false;

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
        this.createAndInsertComponents();
    }

    protected createAndInsertComponents(): void {
        this.insertComponents(this.createControlComponent());
    }

    protected getProvidersFromInputData(inputData: { [key: string]: any }): Provider[] {
        return Object.keys(inputData).map(name => ({ provide: name, useValue: inputData[name] }));
    }

    protected createControlComponent(): ComponentInfo {

        let elementData = this.getElementData();
        let mergedInputData = omit(extend(elementData, this.control.member.data || {}), 'form', 'control');

        let inputProviders: Provider[] = this.getProvidersFromInputData(mergedInputData);
        inputProviders.push(
            { provide: FormGroup, useValue: this.form },
            { provide: this.modelControlType, useValue: this.control },
            { provide: ELEMENT_DATA, useValue: elementData },
            ...this.getInputProviders()
        );

        return this.createComponent(this.control, this.getControlComponentType(), inputProviders);
    }

    protected createComponent(control: ModelControl | ElementHelper, componentType: any, providers: Provider[]): ComponentInfo {

        let resolvedInputs = ReflectiveInjector.resolve(providers);
        let injector = ReflectiveInjector.fromResolvedProviders(resolvedInputs, this.container.parentInjector);
        let componentFactory = this.resolver.resolveComponentFactory(componentType);
        let factory = () => componentFactory.create(injector);

        return { control, component: factory(), factory, rendered: true, container: this.targetContainer };
    }

    protected insertComponents(...components: ComponentInfo[]): void {
        setTimeout(() => {
            components.forEach(componentInfo => {
                componentInfo.container.insert(componentInfo.component.hostView);
            });
            this.controlsInserted = true;
        });
    }

    protected abstract getControlComponentType(): any;

    protected abstract getElementData(): { [key: string]: any };

    protected getInputProviders(): Provider[] {
        return [];
    }

    public isRendered(control: ModelControl | ElementHelper): boolean {
        return super.isRendered(control) && (this.control === control || super.isRendered(this.control));
    }
}