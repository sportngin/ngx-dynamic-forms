import {
    AfterViewChecked, Component, ComponentFactoryResolver, ElementRef, forwardRef, Host, Inject, Injector, NgZone, OnInit, Provider,
    Renderer2, ViewChild, ViewContainerRef, ViewEncapsulation
} from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';

import { ControlSelectorComponent } from '../control.selector.component';
import { INPUT_CONTAINER_PROVIDER, InputContainer } from '../elements/input.container';
import { ElementData }              from '../elements/element.data';
import { FieldType }                from '../field.type';
import { FieldTypeMappings }        from '../field.type.mappings';
import { MODEL_CONTROL_PROVIDER, ModelMemberControl } from '../model/control/model.control';
import { CheckboxMember }           from '../model/member/checkbox.member';
import { SelectionMember }          from '../model/member/selection.member';
import { TemplatedMember }          from '../model/member/templated.member';
import { ValidatorDisplay }         from '../validator.display';
import { VIEW_CONTAINER_ACCESSOR, ViewContainerAccessor } from '../view.container.accessor';
import { FIELD_DATA_PROVIDER, FieldData } from './element.data';

@Component({
    selector: 'form-input',
    templateUrl: './dynamic.input.pug',
    styleUrls: ['./dynamic.input.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => DynamicInputComponent),
        multi: true
    }, {
        provide: VIEW_CONTAINER_ACCESSOR,
        useExisting: DynamicInputComponent
    }]
})
export class DynamicInputComponent extends ControlSelectorComponent<ModelMemberControl> implements ControlValueAccessor, AfterViewChecked, OnInit, ViewContainerAccessor {

    @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;

    disabled: boolean;

    private innerValue: any;
    private onChange: (value: any) => void;
    private onTouched: () => void;
    public formControl: AbstractControl;

    private _inputData: FieldData;

    constructor(
        form: FormGroup,
        @Inject(MODEL_CONTROL_PROVIDER) control: ModelMemberControl,
        resolver: ComponentFactoryResolver,
        private fieldTypeMappings: FieldTypeMappings,
        injector: Injector,
        @Host() @Inject(INPUT_CONTAINER_PROVIDER) private inputContainer: InputContainer,
        private renderer: Renderer2,
        private elementRef: ElementRef,
        private zone: NgZone,
        private validatorDisplay: ValidatorDisplay
    ) {
        super(form, resolver, ModelMemberControl, injector);

        this.control = control;
    }

    ngOnInit(): void {
        this.formControl = this.form.controls[this.control.name] as AbstractControl;

        this.zone.runOutsideAngular(() => {
            this.renderer.addClass(this.elementRef.nativeElement, `ngdf-field`);
            this.renderer.addClass(this.elementRef.nativeElement, `ngdf-${FieldType[this.control.member.fieldType]}`);
        });

        this.inputContainer.addCssClass('form-group');
    }

    ngAfterViewChecked(): void {
        this.checkValidator();
    }

    private checkValidator(): void {
        if (this.validatorDisplay.isSuccess(this.formControl)) {
            this.inputContainer.addCssClass('has-success');
        } else {
            this.inputContainer.removeCssClass('has-success');
        }
        if (this.validatorDisplay.isError(this.formControl)) {
            this.inputContainer.addCssClass('has-danger');
        } else {
            this.inputContainer.removeCssClass('has-danger');
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

    protected getControlComponentType(): any {
        return this.fieldTypeMappings.getComponentType(this.control.member.fieldType);
    }

    protected getInputProviders(): Provider[] {
        return [{
            provide: FIELD_DATA_PROVIDER,
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