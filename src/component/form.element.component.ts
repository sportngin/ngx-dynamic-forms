import { ChangeDetectorRef, Injector, OnDestroy } from '@angular/core';

import { DisableBehavior, FormText }        from '../model';
import { ModelElement }                     from '../model/element';
import { COMPONENT_INFO, ComponentInfo }    from './component.info';
import { ElementData }                      from './element.data';
import { ElementRenderMode }                from './element.render.mode';
import { FormElementComponentBase }         from './form.element.component.base';
import { FormHostComponent, FormState }     from './form.host.component';
import { getText }                          from './form.text.util';

export abstract class FormElementComponent<TModelElement extends ModelElement = ModelElement> extends FormElementComponentBase implements OnDestroy {

    public get renderMode(): ElementRenderMode {
        return this.elementData.renderMode || ElementRenderMode.default;
    }

    public get element(): TModelElement {
        return this.elementData.element as TModelElement;
    }

    public set element(element: TModelElement) {
        this.elementData.element = element;
    }

    protected cdf: ChangeDetectorRef;

    public get state(): FormState {
        if (!this.host) {
            return null;
        }
        return this.host.state;
    }

    private _host: FormHostComponent;
    public get host(): FormHostComponent {
        if (!this._host) {
            this._host = this.injector.get(FormHostComponent);
        }
        return this._host;
    }

    private _componentInfo: ComponentInfo;
    public get componentInfo(): ComponentInfo {
        if (!this._componentInfo) {
            this._componentInfo = this.injector.get(COMPONENT_INFO, null);
        }
        return this._componentInfo;
    }

    constructor(
        public elementData: ElementData,
        injector: Injector
    ) {
        super(elementData, injector);

        this.cdf = this.injector.get(ChangeDetectorRef);
    }

    getText(text: FormText): string {
        return getText(this.form, this.state, text);
    }

    public isDisabled(element: any): boolean {
        let disableBehavior = element as DisableBehavior;
        return disableBehavior.customDisabledHandler ?
            this.handleBehavior('isDisabled', this.form) :
            (disableBehavior.disableWhenInvalid && (!this.form.valid || this.state.submitting))
    }

    public isRendered(element: ModelElement): boolean {
        return super.isRendered(element) && (!this.element || this.element === element || super.isRendered(this.element));
    }

    public get checkedElement(): ModelElement {
        return this.element;
    }

    ngOnDestroy(): void {
        this.cdf.detach();
    }

}