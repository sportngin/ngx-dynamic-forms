import { FormBuilder, FormGroup, ValidatorFn } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

import { BehaviorType }     from '../behavior';
import {
    ArrayMemberBase, ArrayMemberBuilder, CheckboxMember, PasswordMember,
    SimpleMemberBase, MemberType, PageMember, SimpleMemberBuilder
} from './member';
import {
    ButtonType, ModelElement, ButtonAction, ButtonClass, ButtonControlBase, ButtonControlBuilder, LayoutControl,
    RootPageElement
} from './element';

import { FormText }         from './form.text';
import { ModelHelper }      from './model.helper';
import { SelectionMemberBase, SelectionMemberBuilder, SelectionMemberItems } from './member/selection.member';
import { CustomMemberBase, CustomMemberBuilder } from './member/custom.member';

/**
 * The base class used by form Models
 */
export abstract class Model {

    protected children: ModelElement[];
    protected validator: ValidatorFn;

    constructor(validatorOrFirstMember?: ValidatorFn | ModelElement, ...children: ModelElement[]) {
        this.children = children;
        let validatorOrFirstMemberType = typeof validatorOrFirstMember;
        if (validatorOrFirstMemberType === 'undefined') {
            return;
        }
        if (validatorOrFirstMemberType === 'function') {
            this.validator = validatorOrFirstMember as ValidatorFn;
        } else {
            this.children.unshift(validatorOrFirstMember as ModelElement);
        }
    };

    static defaultValueMember(name: string, value: any, memberType: MemberType | string, ...validators: ValidatorFn[]): SimpleMemberBuilder  {
        return new SimpleMemberBase(memberType, name, validators, value);
    }

    static member(name: string, memberType: MemberType | string, ...validators: ValidatorFn[]): SimpleMemberBuilder {
        return Model.defaultValueMember(name, '', memberType, ...validators);
    }

    static customButton(buttonType: ButtonType, buttonAction: ButtonAction | string, buttonClass?: ButtonClass | string, text?: FormText, disableWhenInvalid?: boolean ): ButtonControlBuilder {
        let button = new ButtonControlBase(buttonType, buttonAction, text, disableWhenInvalid);
        if (buttonClass) {
            if (buttonClass.match(/^\.btn-/)) {
                button.addCssClass('.btn');

            }
            button.addCssClass(buttonClass);
        }
        return button;
    }

    static customMember(memberType: MemberType | string, name: string, ...validators: ValidatorFn[]): CustomMemberBuilder {
        return new CustomMemberBase(memberType, name, ...validators);
    }

    static button(buttonAction: ButtonAction | string, buttonClass?: ButtonClass | string, text?: FormText, disableWhenInvalid?: boolean): ButtonControlBuilder {
        return Model.customButton(ButtonType.button, buttonAction, buttonClass, text, disableWhenInvalid);
    }

    static submitButton(buttonClass: ButtonClass, text: FormText, disableWhenInvalid?: boolean): ButtonControlBuilder {
        return Model.customButton(ButtonType.submit, ButtonAction.submit, buttonClass, text, disableWhenInvalid);
    }

    static layout(cssClass: string, ...children: ModelElement[]): LayoutControl {
        return new LayoutControl(cssClass, children);
    }

    static page(pageId: string | number, model: Model): PageMember {
        return new PageMember(pageId, model);
    }

    static pages(
        startPageOrFirstMember: Observable<number> | PageMember,
        updatePageOrSecondMember: (pageIndex: number) => void | PageMember,
        ...pages: PageMember[]): RootPageElement {

        let startPage: Observable<number> = Observable.create([0]);
        if (startPageOrFirstMember['subscribe']) {
            startPage = startPageOrFirstMember as Observable<number>;
        } else {
            pages.unshift(startPageOrFirstMember as PageMember);
        }

        let updatePage: (pageIndex: number) => void;
        if (typeof updatePageOrSecondMember === 'function') {
            updatePage = updatePageOrSecondMember;
        } else {
            pages.unshift(updatePageOrSecondMember);
        }

        return new RootPageElement(startPage, updatePage, pages);
    }

    static hiddenMember(name: string): SimpleMemberBuilder {
        return Model.member(name, MemberType.hidden);
    }

    static textMember(name: string, ...validators: ValidatorFn[]): SimpleMemberBuilder {
        return Model.member(name, MemberType.text, ...validators);
    }

    static passwordMember(name: string, ...validators: ValidatorFn[]): PasswordMember {
        return new PasswordMember(name, validators);
    }

    static checkbox(name: string, checked?: boolean | (() => boolean)): CheckboxMember {
        return new CheckboxMember(name, checked);
    }

    static selectionMember(name: string, items: SelectionMemberItems, itemLabelKey: string, itemValueKey?: string, ...validators: ValidatorFn[]): SelectionMemberBuilder {
        return new SelectionMemberBase(name, items, itemLabelKey, itemValueKey, validators);
    }

    static arrayMember(name: string, template: any, validator?: ValidatorFn): ArrayMemberBuilder {
        return new ArrayMemberBase(name, template, validator);
    }

    // static groupMember(name: string, template: any, validator?: ValidatorFn): TemplatedMember {
    //     return new TemplatedMember(ModelElementType.group, MemberType.group, name, template, validator);
    // }

    static validationMessage(fieldKey: string, errorKey: string, text: string, cssClass?: string): LayoutControl {
        return Model.layout('.validation-message-container')
            .addSiblingTip(text, `${cssClass || ''}.validation-message`)
            .addConditions({ key: `${fieldKey}:${errorKey}`, method: BehaviorType.validateDisplay, required: true });
    }

    static stateMessage(key: string, text: string, cssClass?: string): LayoutControl {
        return Model.layout('.state-message-container')
            .addSiblingTip(text, `${cssClass || ''}.state-message`)
            .addConditions({ key , method: BehaviorType.stateMessageDisplay, required: true });
    }

    toFormGroup(fb: FormBuilder): FormGroup {
        let modelHelper = new ModelHelper(fb);
        return modelHelper.createFormGroup(this.children, this.validator);
    }

    // toControlGroup(): ModelControl[] {
    //     return ModelHelper.createModelControls(this.members);
    // }

    toElements(): ModelElement[] {
        return this.children;
    }

}