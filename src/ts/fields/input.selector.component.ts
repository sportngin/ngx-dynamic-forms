import {
    Component, ComponentFactoryResolver, Input, ReflectiveInjector, ViewChild,
    ViewContainerRef, OnInit
} from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormGroup } from '@angular/forms';

import { extend } from 'lodash';

import { FormControlTypeMappings }  from '../form.control.type';
import { ModelMemberControl }       from '../model/control/model.control';
import { CheckboxMember }           from '../model/member/checkbox.member';
import { SelectionMember }          from '../model/member/selection.member';
import { TemplatedMember }          from '../model/member/templated.member';

interface InputData {

    form: FormGroup;
    formControl: AbstractControl;
    controlName: string;

    checked?: boolean | (() => boolean);
    childControls?: ModelMemberControl[];
    dependentControls?: string[];
    template?: any;

    [key: string]: any;

}

@Component({
    selector: 'input-selector',
    template: '<div #container></div>',
})
export class InputSelectorComponent implements ControlValueAccessor, OnInit {

    @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;

    @Input() control: ModelMemberControl;
    @Input() form: FormGroup;
    disabled: boolean;

    private innerValue: any;
    private onChange: (value: any) => void;
    private onTouched: () => void;
    public formControl: AbstractControl;

    constructor(
        private resolver: ComponentFactoryResolver,
        private formControlTypeMappings: FormControlTypeMappings
    ) {}

    ngOnInit(): void {
        this.formControl = this.form.controls[this.control.name] as AbstractControl;

        // TODO: determine unique id based on parent - is this part of an array or collection?
        let mergedInputData: InputData = extend({
            form: this.form,
            formControl: this.formControl,
            control: this.control,
            controlName: this.control.name,
            childControls: this.control.childControls as ModelMemberControl[]
        }, this.control.member.data || {});

        if (this.control.member instanceof CheckboxMember) {
            mergedInputData.checked = (this.control.member as CheckboxMember).checked;
        }

        if (this.control.member instanceof SelectionMember) {
            mergedInputData.dependentControls = (this.control.member as SelectionMember).dependentControls;
        }

        if (this.control.member instanceof TemplatedMember) {
            mergedInputData.template = (this.control.member as TemplatedMember).template;
        }

        let inputProviders = Object.keys(mergedInputData).map(name => ({ provide: name, useValue: mergedInputData[name] }));
        let resolvedInputs = ReflectiveInjector.resolve(inputProviders);
        let injector = ReflectiveInjector.fromResolvedProviders(resolvedInputs, this.container.parentInjector);
        let componentType = this.formControlTypeMappings.getComponentType(this.control.member.controlType);
        let factory = this.resolver.resolveComponentFactory(componentType);
        let componentInstance = factory.create(injector);

        this.container.insert(componentInstance.hostView);
    }

    get value(): any {
        return this.innerValue;
    }

    set value(value: any) {
        if (value !== this.innerValue) {
            this.innerValue = value;
            this.onChange(value);
        }
    }

    writeValue(value: any): void {
        if (value !== this.innerValue) {
            this.innerValue = value;
        }
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }
}