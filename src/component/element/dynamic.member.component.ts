import {
    AfterViewChecked, Component, Inject, Injector, OnInit, Optional, Provider, ViewEncapsulation
} from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { omit } from 'lodash-es';

import { MemberTypeMappings }   from '../../config/member.type.mappings';

import {
    CheckboxMember, LABEL_DISPLAY_OPTIONS, LabelDisplayOptions, ModelMember, MemberType, SelectionMember,
    TemplatedMember, TEMPLATED_MEMBER_TYPES, ValidationDisplayMode
} from '../../model/member';

import { ElementSiblingPosition }   from '../../model/element.sibling.position';
import { ComponentInfo }            from '../component.info';
import { ElementData }              from '../element.data';
import { ElementRenderMode }        from '../element.render.mode';
import { FormControlComponent }     from '../form.control.component';
import { MemberData }               from '../member.data';
import { ValidatorDisplay }         from '../validator.display';
import { MemberDisplayComponent }   from './member.display.component';

let elementId = 0;

@Component({
    selector: 'form-member',
    templateUrl: './dynamic.member.component.pug',
    styleUrls: ['./dynamic.member.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DynamicMemberComponent extends FormControlComponent<ModelMember> implements AfterViewChecked, OnInit {

    disabled: boolean;

    public formControl: AbstractControl;
    public readonly elementId: string;

    private _inputData: MemberData;

    constructor(
        @Inject(ElementData) public elementData: MemberData,
        @Inject(LABEL_DISPLAY_OPTIONS) @Optional() private labelDisplayOptions: LabelDisplayOptions,
        private memberTypeMappings: MemberTypeMappings,
        injector: Injector,
        private validatorDisplay: ValidatorDisplay
    ) {
        super(elementData, injector);

        this.elementId = `ngdf-${elementId++}`;
        this.formControl = this.form.controls[this.element.name] as AbstractControl;
    }

    ngOnInit(): void {

        this.addCssClass(`ngdf-field`);
        this.addCssClass(`ngdf-${MemberType[this.element.memberType] || this.element.memberType}`);
        this.addCssClass('form-group');
    }

    ngAfterViewChecked(): void {
        this.checkValidator();
    }

    private checkValidator(): void {
        if (!this.element.validationDisplay) {
            return;
        }
        if ((this.element.validationDisplay & ValidationDisplayMode.valid) === ValidationDisplayMode.valid) {
            if (this.validatorDisplay.isSuccess(this.formControl)) {
                this.addCssClass('has-success');
            } else {
                this.removeCssClass('has-success');
            }
        }
        if ((this.element.validationDisplay & ValidationDisplayMode.invalid) === ValidationDisplayMode.invalid) {
            if (this.validatorDisplay.isError(this.formControl)) {
                this.addCssClass('has-danger');
            } else {
                this.removeCssClass('has-danger');
            }
        }
    }

    private get inputData(): MemberData {
        if (!this._inputData) {
            // TODO: determine unique id based on parent - is this part of an array or collection?
            let inputData: MemberData = {
                elementId: this.elementId,
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

    protected getComponentType(member: ModelMember): any {
        if (this.renderMode === ElementRenderMode.displayOnly && member.memberType !== MemberType.hidden) {
            return MemberDisplayComponent;
        }
        return this.memberTypeMappings.getComponentType(this.element.memberType);
    }

    public shouldRenderLabel(position: string): boolean {
        if (!this.element.label) {
            return false;
        }
        if (this.labelDisplayOptions) {
            if (this.renderMode === ElementRenderMode.default && !this.labelDisplayOptions.controls) {
                return false;
            }
            if (this.renderMode === ElementRenderMode.displayOnly && !this.labelDisplayOptions.valueDisplays) {
                return false;
            }
        }
        return this.element.labelPosition === position || this.element.labelPosition === ElementSiblingPosition.both;
    }

    protected createControlComponent(): ComponentInfo {

        let elementData = this.getElementData();
        let mergedInputData = omit(Object.assign(elementData, { createsSiblings: false }), 'form', 'control');

        let inputProviders: Provider[] = this.getProvidersFromInputData(mergedInputData);
        inputProviders.push(
            { provide: MemberData, useValue: elementData },
            ...this.getInputProviders()
        );
        let componentType = this.getComponentType(this.element);

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

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }
}