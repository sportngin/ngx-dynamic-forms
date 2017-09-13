import {
    AfterViewChecked, Component, forwardRef, Injector, NgZone, OnInit, Provider, ViewEncapsulation
} from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { extend, omit } from 'lodash';

import { MemberTypeMappings }   from '../../config/member.type.mappings';

import {
    CheckboxMember, ModelMember, MemberType, SelectionMember, TemplatedMember, TEMPLATED_MEMBER_TYPES
} from '../../model/member';

import { ComponentInfo }            from '../component.info';
import { ElementData }              from '../element.data';
import { FormControlComponent }     from '../form.control.component';
import { MemberData }               from '../member.data';
import { ValidatorDisplay }         from '../validator.display';

@Component({
    selector: 'form-member',
    templateUrl: './dynamic.member.component.pug',
    styleUrls: ['./dynamic.member.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => DynamicMemberComponent),
        multi: true
    }]
})
export class DynamicMemberComponent extends FormControlComponent<ModelMember> implements ControlValueAccessor, AfterViewChecked, OnInit {

    disabled: boolean;

    private innerValue: any;
    private onChange: (value: any) => void;
    private onTouched: () => void;
    public formControl: AbstractControl;

    private _inputData: MemberData;

    constructor(
        elementData: ElementData,
        private memberTypeMappings: MemberTypeMappings,
        injector: Injector,
        private zone: NgZone,
        private validatorDisplay: ValidatorDisplay
    ) {
        super(elementData, injector);

        this.formControl = this.form.controls[this.element.name] as AbstractControl;
    }

    ngOnInit(): void {

        this.zone.runOutsideAngular(() => {
            this.addCssClass(`ngdf-field`);
            this.addCssClass(`ngdf-${MemberType[this.element.memberType]}`);
        });

        this.addCssClass('form-group');
    }

    ngAfterViewChecked(): void {
        this.checkValidator();
    }

    private checkValidator(): void {
        if (!this.element.displaysValidation) {
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

    private get inputData(): MemberData {
        if (!this._inputData) {
            // TODO: determine unique id based on parent - is this part of an array or collection?
            let inputData: MemberData = {
                form: this.form,
                element: this.element,
                formControl: this.formControl
            };

            if (this.element.memberType === MemberType.checkbox) {
                inputData.checked = (this.element as CheckboxMember).checked;
            }

            if (this.element.memberType === MemberType.dropdown) {
                inputData.dependentControls = (this.element as SelectionMember).dependentControls;
            }

            if (TEMPLATED_MEMBER_TYPES.indexOf(this.element.memberType) >= 0) {
                inputData.template = (this.element as TemplatedMember).template;
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
        let mergedInputData = omit(extend(elementData, this.element.data || {}, { createsTips: false }), 'form', 'control');

        let inputProviders: Provider[] = this.getProvidersFromInputData(mergedInputData);
        inputProviders.push(
            { provide: MemberData, useValue: elementData },
            ...this.getInputProviders()
        );
        let componentType = this.memberTypeMappings.getComponentType(this.element.memberType);

        return this.createComponent(this.element, componentType, inputProviders);
    }

    public getProvidersFromInputData(inputData: { [key: string]: any }): Provider[] {
        return Object.keys(inputData).map(name => ({ provide: name, useValue: inputData[name] }));
    }

    protected getInputProviders(): Provider[] {
        return [{
            provide: MemberData,
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