import { Injector } from '@angular/core';

import { ElementData }                  from './elements/element.data';
import { FormComponentHost, FormState } from './form.component.host';
import { FormElement }                  from './form.element';
import { FormText, getText }            from './form.text';
import { ModelControl }                 from './model/control/model.control';
import { DisableBehavior }              from './model/disable.behavior';

export abstract class HostedElement<TModelControl extends ModelControl = ModelControl> extends FormElement {

    public get state(): FormState {
        if (!this.host) {
            return null;
        }
        return this.host.state;
    }

    public control: TModelControl;

    private _host: FormComponentHost;

    public get host(): FormComponentHost {
        if (!this._host) {
            this._host = this.injector.get(FormComponentHost);
        }
        return this._host;
    }

    public displayOnly: boolean = false;

    constructor(
        protected elementData: ElementData,
        injector: Injector
    ) {
        super(elementData.form, injector);

        this.control = this.elementData.control as TModelControl;
        this.displayOnly = elementData.displayOnly || this.displayOnly;
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

}