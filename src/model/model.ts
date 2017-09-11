import { FormBuilder, FormGroup, ValidatorFn } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

import { BehaviorType }                     from '../behavior/behaviors';
import { ButtonType }                       from '../elements/button.type';
import { FieldType }                        from '../field.type';
import { FormText }                         from '../form.text';
import { ModelControl }                     from './control/model.control';
import { ArrayMember }                      from './member/array.member';
import { ButtonAction, ButtonClass, ButtonMember } from './member/button.member';
import { CheckboxMember }                   from './member/checkbox.member';
import { LayoutMember }                     from './member/layout.member';
import { PageMember, RootPageMember }       from './member/page.member';
import { PasswordMember }                   from './member/password.member';
import { SelectionMember }                  from './member/selection.member';
import { SimpleMember }                     from './member/simple.member';
import { TemplatedMember }                  from './member/templated.member';
import { ModelElement }                     from './model.element';
import { ModelHelper }                      from './model.helper';
import { ElementType } from '../element.type';

/**
 * The base class used by form Models
 */
export abstract class Model {

    protected members: ModelElement[];
    protected validator: ValidatorFn;

    constructor(validatorOrFirstMember: ValidatorFn | ModelElement, ...members: ModelElement[]) {
        this.members = members;
        if (typeof validatorOrFirstMember === 'function') {
            this.validator = validatorOrFirstMember;
        } else {
            this.members.unshift(validatorOrFirstMember);
        }
    };

    static submitButton(buttonClass: ButtonClass, text: FormText, disableWhenInvalid: boolean = true): ButtonMember {
        return Model.customButton(ButtonType.submit, ButtonAction.submit, buttonClass, text, disableWhenInvalid);
    }

    static button(buttonAction: ButtonAction | string, buttonClass: ButtonClass, text?: FormText, disableWhenInvalid: boolean = false): ButtonMember {
        return Model.customButton(ButtonType.button, buttonAction, buttonClass, text, disableWhenInvalid);
    }

    static customButton(buttonType: ButtonType, buttonAction: ButtonAction | string, buttonClass: ButtonClass, text?: FormText, disableWhenInvalid: boolean = false): ButtonMember {
        return new ButtonMember(buttonType, buttonAction, buttonClass, text, disableWhenInvalid);
    }

    static layout(cssClass: string, ...members: ModelElement[]): LayoutMember {
        return new LayoutMember(cssClass, members);
    }

    static page(pageId: string | number, model: Model): PageMember {
        return new PageMember(pageId, model);
    }

    static pages(
        startPageOrFirstMember: Observable<number> | PageMember,
        updatePageOrSecondMember: (pageIndex: number) => void | PageMember,
        ...members: PageMember[]): RootPageMember {

        let startPage: Observable<number> = Observable.create([0]);
        if (startPageOrFirstMember['subscribe']) {
            startPage = startPageOrFirstMember as Observable<number>;
        } else {
            members.unshift(startPageOrFirstMember as PageMember);
        }

        let updatePage: (pageIndex: number) => void;
        if (typeof updatePageOrSecondMember === 'function') {
            updatePage = updatePageOrSecondMember;
        } else {
            members.unshift(updatePageOrSecondMember);
        }

        return new RootPageMember(startPage, updatePage, members);
    }

    static textMember(name: string, ...validators: ValidatorFn[]): SimpleMember {
        return Model.member(name, FieldType.text, ...validators);
    }

    static hiddenMember(name: string): SimpleMember {
        return Model.member(name, FieldType.hidden);
    }

    static passwordMember(name: string, ...validators: ValidatorFn[]): PasswordMember {
        return new PasswordMember(name, validators);
    }

    static checkbox(name: string, checked?: boolean | (() => boolean)): CheckboxMember {
        return new CheckboxMember(name, checked);
    }

    static member(name: string, controlType: FieldType | string, ...validators: ValidatorFn[]): SimpleMember {
        return Model.defaultValueMember(name, '', controlType, ...validators);
    }

    static selectionMember(name: string, ...validators: ValidatorFn[]): SelectionMember {
        return new SelectionMember(name, validators);
    }

    static defaultValueMember(name: string, value: any, controlType: FieldType | string, ...validators: ValidatorFn[]): SimpleMember {
        return new SimpleMember(controlType, name, validators, value);
    }

    static arrayMember(name: string, template: any, validator?: ValidatorFn): ArrayMember {
        return new ArrayMember(name, template, validator);
    }

    // static groupMember(name: string, template: any, validator?: ValidatorFn): TemplatedMember {
    //     return new TemplatedMember(ModelElementType.group, FieldType.group, name, template, validator);
    // }

    static validationMessage(fieldKey: string, errorKey: string, text: string, cssClass?: string): LayoutMember {
        return Model.layout('.validation-message-container')
            .addHelper(text, `${cssClass || ''}.validation-message`)
            .addConditions({ key: `${fieldKey}:${errorKey}`, method: BehaviorType.validateDisplay, required: true });
    }

    static stateMessage(key: string, text: string, cssClass?: string): LayoutMember {
        return Model.layout('.state-message-container')
            .addHelper(text, `${cssClass || ''}.state-message`)
            .addConditions({ key , method: BehaviorType.stateMessageDisplay, required: true })
    }

    toFormGroup(fb: FormBuilder): FormGroup {
        return ModelHelper.createFormGroup(fb, this.members, this.validator);
    }

    toControlGroup(): ModelControl[] {
        return ModelHelper.createModelControls(this.members);
    }

}