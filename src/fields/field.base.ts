import { Injector, Input, InjectionToken }          from '@angular/core';
import { AbstractControl, FormControl, FormGroup }  from '@angular/forms';

import { ElementBase }          from '../element.base';
import { FormComponentHost }    from '../form.component.host';
import { ModelControl }         from '../model/control/model.control';

export abstract class FieldBase<
    TControl extends AbstractControl = FormControl,
    TModelControl extends ModelControl = ModelControl
    > extends ElementBase<TModelControl> {

    @Input() public formControl: TControl;
    @Input() public controlName: string;

    public readonly tokens: any = {
        form: new InjectionToken<FormGroup>('form'),
        formControl: new InjectionToken<TControl>('formControl'),
        controlName: new InjectionToken<string>('controlName')
    };

    constructor(
        injector: Injector,
        host: FormComponentHost,
        ...tokens: any[]) {
        super(injector, host, ...tokens);

        this.setProperties(this.tokens);

        this.host = host;
        this.state = host.state;
    }
}
