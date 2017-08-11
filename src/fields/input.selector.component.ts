import {
    Component, ComponentFactoryResolver, Inject, Injector, Provider, ViewChild,
    ViewContainerRef
} from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormGroup } from '@angular/forms';

import { extend } from 'lodash';

import { BehaviorService }          from '../behavior/behavior.service';
import { ControlSelectorComponent } from '../control.selector.component';
import { FieldTypeMappings }        from '../field.type.mappings';
import { MODEL_CONTROL_PROVIDER, ModelMemberControl } from '../model/control/model.control';
import { CheckboxMember }           from '../model/member/checkbox.member';
import { SelectionMember }          from '../model/member/selection.member';
import { TemplatedMember }          from '../model/member/templated.member';
import { ELEMENT_DATA_PROVIDER, ElementData } from './element.data';

@Component({
    selector: 'input-selector',
    templateUrl: '../control.selector.pug'
})
export class InputSelectorComponent extends ControlSelectorComponent<ModelMemberControl> implements ControlValueAccessor{

    @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;

    disabled: boolean;

    private innerValue: any;
    private onChange: (value: any) => void;
    private onTouched: () => void;
    public formControl: AbstractControl;

    private _inputData: ElementData;

    constructor(
        form: FormGroup,
        @Inject(MODEL_CONTROL_PROVIDER) control: ModelMemberControl,
        resolver: ComponentFactoryResolver,
        private fieldTypeMappings: FieldTypeMappings,
        injector: Injector,
        behaviorService: BehaviorService
    ) {
        super(form, resolver, ModelMemberControl, injector, behaviorService);

        this.control = control;
    }

    ngOnInit(): void {
        this.formControl = this.form.controls[this.control.name] as AbstractControl;
        super.ngOnInit();
    }

    private get inputData(): ElementData {
        if (!this._inputData) {
            // TODO: determine unique id based on parent - is this part of an array or collection?
            let inputData: ElementData = {
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

    protected getInputData(): { [key: string]: any } {
        return this.inputData;
    }

    protected getControlComponentType(): any {
        return this.fieldTypeMappings.getComponentType(this.control.member.fieldType);
    }

    protected getInputProviders(): Provider[] {
        return [{
            provide: ELEMENT_DATA_PROVIDER,
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