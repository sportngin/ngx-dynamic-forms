import { InjectionToken, Injector, Input }  from '@angular/core';
import { FormGroup }                        from '@angular/forms';

import { BehaviorService }      from './behavior/behavior.service';
import { FormComponentHost }    from './form.component.host';
import { HostedElement }        from './hosted.element';
import { ModelControl }         from './model/control/model.control';

export class ElementBase<TModelControl extends ModelControl = ModelControl> extends HostedElement {

    public readonly tokens = {
        childControls: new InjectionToken<ModelControl[]>('childControls'),
        control: new InjectionToken<TModelControl>('control'),
        form: new InjectionToken<FormGroup>('form')
    };

    @Input() public childControls: ModelControl[];
    @Input() public control: TModelControl;

    constructor(
        injector: Injector,
        behaviorService: BehaviorService,
        host: FormComponentHost,
        ...tokens: any[]) {
        super(injector, behaviorService, host);

        this.setProperties(this.tokens);
        tokens.forEach((tokenObj: any) => this.setProperties(tokenObj));
    }

    protected setProperties(tokens: {}): void {
        Object.keys(tokens).forEach((name: string) => {
            // FIXME: figure out how to use InjectionTokens instead, but they'd need to be dynamically accessible somehow from InputSelectorComponent
            (this as any)[name] = this.injector.get(name, null);
        });
    }
}