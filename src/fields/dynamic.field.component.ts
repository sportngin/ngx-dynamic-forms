import {
    Component, ElementRef, forwardRef, Injector, Input, NgZone, OnInit, Renderer2,
    ViewChild, ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';

import { BehaviorService }          from '../behavior/behavior.service';
import { FormComponentHost }        from '../form.component.host';
import { FieldType }          from '../field.type';
import { HostedElement }            from '../hosted.element';
import { ModelMemberControl }       from '../model/control/model.control';
import { InputSelectorComponent }   from './input.selector.component';

@Component({
    selector: 'dyn-field',
    templateUrl: './dynamic.field.pug',
    styleUrls: ['./dynamic.field.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => DynamicFieldComponent),
        multi: true
    }]
})
export class DynamicFieldComponent extends HostedElement implements ControlValueAccessor, OnInit {

    @Input() control: ModelMemberControl;
    @ViewChild('input', { read: InputSelectorComponent }) input: ControlValueAccessor;

    constructor(
        form: FormGroup,
        injector: Injector,
        behaviorService: BehaviorService,
        host: FormComponentHost
    ) {
        super(form, injector, behaviorService, host);
    }

    ngOnInit(): void {
        let renderer = this.injector.get(Renderer2);
        let elementRef = this.injector.get(ElementRef);
        let zone = this.injector.get(NgZone);
        zone.runOutsideAngular(() => {
            renderer.addClass(elementRef.nativeElement, `ngdf-field`);
            renderer.addClass(elementRef.nativeElement, `ngdf-${FieldType[this.control.member.fieldType]}`);
        });
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