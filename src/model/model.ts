import { FormBuilder, FormGroup, ValidatorFn } from '@angular/forms';

import { FormControlType }                  from '../form.control.type';
import { ModelControl }                     from './control/model.control';
import { ArrayMember }                      from './member/array.member';
import { ButtonAction, ButtonActions, ButtonClass, ButtonMember } from './member/button.member';
import { CheckboxMember }                   from './member/checkbox.member';
import { LayoutMember }                     from './member/layout.member';
import { PageMember, RootPageMember }       from './member/page.member';
import { PasswordMember }                   from './member/password.member';
import { SelectionMember }                  from './member/selection.member';
import { SimpleMember }                     from './member/simple.member';
import { TemplatedMember }                  from './member/templated.member';
import { ModelElement, ModelElementTypes }  from './model.element';
import { ModelHelper }                      from './model.helper';

/**
 * The base class used by form Models
 */
export abstract class Model {

    protected members: ModelElement[];

    constructor(...members: ModelElement[]) {
        this.members = members;
    };

    static submitButton(buttonClass: ButtonClass, text: string, submittingText?: string, disableWhenInvalid: boolean = true): ButtonMember {
        return new ButtonMember(ModelElementTypes.submit, ButtonActions.submit, buttonClass, text, submittingText, disableWhenInvalid);
    }

    static button(buttonAction: ButtonAction, buttonClass: ButtonClass, text?: string, altText?: string, disableWhenInvalid: boolean = false): ButtonMember {
        return new ButtonMember(ModelElementTypes.button, buttonAction, buttonClass, text, altText, disableWhenInvalid);
    }

    static layout(cssClass: string, ...members: ModelElement[]): LayoutMember {
        return new LayoutMember(cssClass, members);
    }

    static page(pageId: string | number, model: Model): PageMember {
        return new PageMember(pageId, model);
    }

    static pages(...members: PageMember[]): RootPageMember {
        return new RootPageMember(members);
    }

    static textMember(name: string, ...validators: ValidatorFn[]): SimpleMember {
        return Model.member(name, FormControlType.text, ...validators);
    }

    static hiddenMember(name: string): SimpleMember {
        return Model.member(name, FormControlType.hidden);
    }

    static passwordMember(name: string, ...validators: ValidatorFn[]): PasswordMember {
        return new PasswordMember(name, validators);
    }

    static checkbox(name: string, checked?: boolean | (() => boolean)): CheckboxMember {
        return new CheckboxMember(name, checked);
    }

    static member(name: string, controlType: FormControlType | string, ...validators: ValidatorFn[]): SimpleMember {
        return Model.defaultValueMember(name, '', controlType, ...validators);
    }

    static selectionMember(name: string, ...validators: ValidatorFn[]): SelectionMember {
        return new SelectionMember(name, validators);
    }

    static defaultValueMember(name: string, value: any, controlType: FormControlType | string, ...validators: ValidatorFn[]): SimpleMember {
        return new SimpleMember(controlType, name, validators, value);
    }

    static arrayMember(name: string, template: any, validator?: ValidatorFn): ArrayMember {
        return new ArrayMember(name, template, validator);
    }

    static groupMember(name: string, template: any, validator?: ValidatorFn): TemplatedMember {
        return new TemplatedMember(ModelElementTypes.group, FormControlType.group, name, template, validator);
    }

    static validationMessage(fieldKey: string, errorKey: string, text: string, cssClass?: string): LayoutMember {
        let layout = Model.layout('');

        layout
            .addHelper(text, cssClass)
            .addConditions({ key: `${fieldKey}:${errorKey}`, method: 'displayValidation' });

        return layout;
    }

    toFormGroup(fb: FormBuilder): FormGroup {
        return ModelHelper.createFormGroup(fb, this.members);
    }

    toControlGroup(): ModelControl[] {
        return ModelHelper.createModelControls(this.members);
    }

}