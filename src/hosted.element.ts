import { ChangeDetectorRef, ComponentRef, DoCheck, Injector, OnDestroy } from '@angular/core';

import { COMPONENT_INFO, ComponentInfo } from './component.info';
import { ElementData }                  from './elements/element.data';
import { FormComponentHost, FormState } from './form.component.host';
import { FormElement }                  from './form.element';
import { FormText, getText }            from './form.text';
import { ModelControl }                 from './model/control/model.control';
import { DisableBehavior }              from './model/disable.behavior';
import { ElementHelper }                from './model/model.element';

export abstract class HostedElement<TModelControl extends ModelControl = ModelControl> extends FormElement implements DoCheck, OnDestroy {

    public get displayOnly(): boolean {
        return this.elementData.displayOnly || false;
    };

    public get control(): TModelControl {
        return this.elementData.control as TModelControl;
    };

    protected cdf: ChangeDetectorRef;
    protected get isPlaceholder(): boolean {
        return false;
    }

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
        public elementData: ElementData,
        injector: Injector
    ) {
        super(elementData.form, injector);

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
        return super.isRendered(control) && (!this.control || this.control === control || super.isRendered(this.control));
    }

    protected get checkedControl(): ModelControl | ElementHelper {
        return this.control;
    }

    public ngDoCheck(): void {
        if (!this.control) {
            return;
        }
        let shouldRender = this.isRendered(this.checkedControl);
        let isRendered = !this.isPlaceholder;
        if (shouldRender !== isRendered) {
            if (shouldRender) {
                this.replace(this.componentInfo.componentFactory);
            } else {
                this.replace(this.componentInfo.placeholderFactory);
            }
        }
    }

    private replace(replacementComponentFactory: () => ComponentRef<any>): void {
        setTimeout(() => {
            let index = this.componentInfo.container.indexOf(this.componentInfo.component.hostView);
            this.componentInfo.container.remove(index);
            let replacement = replacementComponentFactory();
            this.componentInfo.component = replacement;
            this.componentInfo.container.insert(replacement.hostView, index);
        });
    }

    ngOnDestroy(): void {
        this.cdf.detach();
    }

}