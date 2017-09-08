import {
    AfterViewChecked, Component, forwardRef, Injector, NgZone, OnInit, Provider, ViewEncapsulation
} from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { extend, omit } from 'lodash';

import { ComponentInfo }            from '../component.info';
import { ElementData }              from '../elements/element.data';
import { FieldType }                from '../field.type';
import { FieldTypeMappings }        from '../field.type.mappings';
import { HostedControl }            from '../hosted.control';
import { ModelMemberControl }       from '../model/control/model.control';
import { CheckboxMember }           from '../model/member/checkbox.member';
import { SelectionMember }          from '../model/member/selection.member';
import { TemplatedMember }          from '../model/member/templated.member';
import { ValidatorDisplay }         from '../validator.display';
import { FieldData }                from './field.data';

@Component({
    selector: 'form-input',
    templateUrl: './dynamic.input.component.pug',
    styleUrls: ['./dynamic.input.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => DynamicInputComponent),
        multi: true
    }]
})
export class DynamicInputComponent extends HostedControl<ModelMemberControl> implements ControlValueAccessor, AfterViewChecked, OnInit {

    disabled: boolean;

    private innerValue: any;
    private onChange: (value: any) => void;
    private onTouched: () => void;
    public formControl: AbstractControl;

    private _inputData: FieldData;

    constructor(
        elementData: ElementData,
        private fieldTypeMappings: FieldTypeMappings,
        injector: Injector,
        private zone: NgZone,
        private validatorDisplay: ValidatorDisplay
    ) {
        super(elementData, injector);

        this.formControl = this.form.controls[this.control.name] as AbstractControl;
    }

    ngOnInit(): void {

        this.zone.runOutsideAngular(() => {
            this.addCssClass(`ngdf-field`);
            this.addCssClass(`ngdf-${FieldType[this.control.member.fieldType]}`);
        });

        this.addCssClass('form-group');
    }

    ngAfterViewChecked(): void {
        this.checkValidator();
    }

    private checkValidator(): void {
        if (!this.control.member.usesValidationClasses) {
            return;
        }
        if (this.validatorDisplay.isSuccess(this.formControl)) {
            this.addCssClass('has-success');
        } else {
            this.removeCssClass('has-success');
        }
        if (this.validatorDisplay.isError(this.formControl)) {
            this.addCssClass('has-danger');
        } else {
            this.removeCssClass('has-danger');
        }
    }

    private get inputData(): FieldData {
        if (!this._inputData) {
            // TODO: determine unique id based on parent - is this part of an array or collection?
            let inputData: FieldData = {
                form: this.form,
                control: this.control,
                formControl: this.formControl,
                childControls: this.control.childControls as ModelMemberControl[]
            };

            if (this.control.member instanceof CheckboxMember) {
                inputData.checked = (this.control.member as CheckboxMember).checked;
            }

            if (this.control.member instanceof SelectionMember) {
                inputData.dependentControls = (this.control.member as SelectionMember).dependentControls;
            }

            if (this.control.member instanceof TemplatedMember) {
                inputData.template = (this.control.member as TemplatedMember).template;
            }

            this._inputData = inputData;
        }
        return this._inputData;
    }

    protected getElementData(): ElementData {
        return this.inputData;
    }

    protected createChildComponents(): ComponentInfo[] {
        return [this.createControlComponent()];
    }

    protected createControlComponent(): ComponentInfo {

        let elementData = this.getElementData();
        let mergedInputData = omit(extend(elementData, this.control.member.data || {}, { createsHelpers: false }), 'form', 'control');

        let inputProviders: Provider[] = this.getProvidersFromInputData(mergedInputData);
        inputProviders.push(
            { provide: ElementData, useValue: elementData },
            ...this.getInputProviders()
        );
        let componentType = this.fieldTypeMappings.getComponentType(this.control.member.fieldType);

        return this.createComponent(this.control, componentType, inputProviders);
    }

    public getProvidersFromInputData(inputData: { [key: string]: any }): Provider[] {
        return Object.keys(inputData).map(name => ({ provide: name, useValue: inputData[name] }));
    }

    protected getInputProviders(): Provider[] {
        return [{
            provide: FieldData,
            useValue: this.inputData
        }]
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