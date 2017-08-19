import {
    ChangeDetectorRef, ComponentRef, DoCheck, Injector, OnDestroy, OnInit, TemplateRef,
    ViewChild
} from '@angular/core';

import { COMPONENT_INFO, ComponentInfo, TemplatedComponent } from './component.info';
import { ElementData }                  from './elements/element.data';
import { FormComponentHost, FormState } from './form.component.host';
import { FormElement }                  from './form.element';
import { FormText, getText }            from './form.text';
import { ModelControl }                 from './model/control/model.control';
import { DisableBehavior }              from './model/disable.behavior';
import { ElementHelper }                from './model/model.element';

export abstract class HostedElement<TModelControl extends ModelControl = ModelControl> extends FormElement implements DoCheck, OnDestroy, OnInit {

    @ViewChild(TemplateRef) public template: TemplateRef<any>;
    public displayOnly: boolean = false;
    public control: TModelControl;

    private currentlyRendered: boolean = true;
    protected cdf: ChangeDetectorRef;

    public get state(): FormState {
        if (!this.host) {
            return null;
        }
        return this.host.state;
    }

    private _host: FormComponentHost;
    public get host(): FormComponentHost {
        if (!this._host) {
            this._host = this.injector.get(FormComponentHost);
        }
        return this._host;
    }

    private _componentInfo: ComponentInfo;
    public get componentInfo(): ComponentInfo {
        if (!this._componentInfo) {
            this._componentInfo = this.injector.get(COMPONENT_INFO);
        }
        return this._componentInfo;
    }

    constructor(
        protected elementData: ElementData,
        injector: Injector
    ) {
        super(elementData.form, injector);

        this.control = this.elementData.control as TModelControl;
        this.displayOnly = elementData.displayOnly || this.displayOnly;
        this.cdf = this.injector.get(ChangeDetectorRef);
    }

    getText(text: FormText): string {
        return getText(this.form, this.state, text);
    }

    public isDisabled(control: any): boolean {
        if (!control.constructor.prototype.hasOwnProperty('disableWhenInvalid')) {
            return false;
        }
        let disableBehavior = control as DisableBehavior;
        return disableBehavior.customDisabledHandler ?
            this.handleBehavior('isDisabled', this.form) :
            (disableBehavior.disableWhenInvalid && (!this.form.valid || this.state.submitting))
    }

    public isRendered(control: ModelControl | ElementHelper): boolean {
        return super.isRendered(control) && (this.control === control || super.isRendered(this.control));
    }

    protected checkedControl(): ModelControl | ElementHelper {
        return this.control;
    }

    public ngDoCheck(): void {
        if (!this.control) {
            return;
        }
        // console.log('info', info, info.container.indexOf(info.component.hostView));
        if (!this.template) {
            // console.log('template?', this.injector.get(TemplateRef));
            // console.warn('no template', this);
            // return;
        }
        // console.log(`${this.constructor.name}.ngDoCheck`, this.control, this.template);
        let shouldRender = this.isRendered(this.checkedControl());
        if (shouldRender !== this.currentlyRendered) {
            console.log('changing rendering', this.componentInfo.container.indexOf(this.componentInfo.component.hostView));
            // if (shouldRender) {
            //     console.log('replacing placeholder with component');
            //     this.replace(this.componentInfo.placeholder, this.componentInfo.component);
            // } else {
            //     console.log('replacing component with placeholder');
            //     this.replace(this.componentInfo.component, this.componentInfo.placeholder);
            // }
        }
    }

    private replace(replacedComponent: ComponentRef<TemplatedComponent>, replacementComponent: ComponentRef<TemplatedComponent>): void {
        console.log('componentInfo', this.control, {
            replacedComponent: replacedComponent.instance.constructor.name,
            replacementComponent: replacementComponent.instance.constructor.name
        });
        let index = this.componentInfo.container.indexOf(replacedComponent.hostView);
        replacedComponent.hostView.detach();
        this.componentInfo.container.remove(index);
        if (replacementComponent.instance.template) {
            console.log('createEmbeddedView');
            this.componentInfo.container.createEmbeddedView(replacementComponent.instance.template, index);
        } else {
            console.log('insert', replacementComponent.instance.constructor.name, replacementComponent.hostView.destroyed);
            this.componentInfo.container.insert(replacementComponent.hostView, index);
        }
        this.currentlyRendered = !this.currentlyRendered;
    }

    ngOnDestroy(): void {
        console.log(`${this.constructor.name}.ngOnDestroy`);
        this.cdf.detach();
    }

    ngOnInit(): void {
        setTimeout(() => console.log(`${this.constructor.name}.ngOnInit`, this.template));
    }

}