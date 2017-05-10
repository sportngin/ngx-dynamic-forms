import { Component, forwardRef, Injector, Input, ViewChild }    from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR }              from '@angular/forms';

import { FormComponentHost }        from '../form.component.host';
import { HostedElement }            from '../hosted.element';
import { ModelMemberControl }       from '../model/control/model.control';
import { InputSelectorComponent }   from './input.selector.component';

@Component({
    selector: 'dyn-field',
    templateUrl: './dynamic.field.pug.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => DynamicFieldComponent),
        multi: true
    }]
})
export class DynamicFieldComponent extends HostedElement implements ControlValueAccessor {

    @Input() control: ModelMemberControl;
    @ViewChild('input', { read: InputSelectorComponent }) input: ControlValueAccessor;

    constructor(
        injector: Injector,
        host: FormComponentHost
    ) {
        super(injector, host);
    }

    writeValue(obj: any): void {
        this.input.writeValue(obj);
    }

    registerOnChange(fn: any): void {
        this.input.registerOnChange(fn);
    }

    registerOnTouched(fn: any): void {
        this.input.registerOnTouched(fn);
    }

    setDisabledState(isDisabled: boolean): void {
        this.input.setDisabledState(isDisabled);
    }

}