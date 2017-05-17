import { AbstractControl, FormBuilder, FormGroup, ValidatorFn } from '@angular/forms';

import { chain, map } from 'lodash';

import { FormControlType }                  from '../form.control.type';
import { ArrayControl }                     from './control/array.control';
import { ButtonControl }                    from './control/button.control';
import { LayoutControl }                    from './control/layout.control';
import { ModelControl, ModelMemberControl } from './control/model.control';
import { PageControl, RootPageControl }     from './control/page.control';
import { PasswordControl }                  from './control/password.control';
import { ArrayMember }                      from './member/array.member';
import { ButtonAction, ButtonActions, ButtonClass, ButtonMember } from './member/button.member';
import { CheckboxMember }                   from './member/checkbox.member';
import { ContainerMember }                  from './member/container.member';
import { LayoutMember }                     from './member/layout.member';
import { ModelMemberBase }                  from './member/model.member';
import { PageMember, RootPageMember }       from './member/page.member';
import { PasswordMember }                   from './member/password.member';
import { SelectionMember }                  from './member/selection.member';
import { SimpleMember }                     from './member/simple.member';
import { TemplatedMember }                  from './member/templated.member';
import { ModelElement, ModelElementTypes }  from './model.element';

export function toControlGroup(members: ModelElement[]): ModelControl[] {
    return map(members, (member: ModelElement, index: number) => {
        if (member.elementType === ModelElementTypes.button || member.elementType === ModelElementTypes.submit) {
            return new ButtonControl(member as ButtonMember);
        }
        if (member.elementType === ModelElementTypes.layout) {
            return new LayoutControl(member as LayoutMember);
        }
        if (member.elementType === ModelElementTypes.page) {
            return new PageControl(member as PageMember, index);
        }
        if (member.elementType === ModelElementTypes.pageRoot) {
            return new RootPageControl(member as RootPageMember);
        }
        if (member.elementType === ModelElementTypes.array) {
            return new ArrayControl(member as ArrayMember);
        }
        if (member instanceof PasswordMember) {
            return new PasswordControl(member as PasswordMember);
        }
        return new ModelMemberControl(member as ModelMemberBase);
    });
}

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

    static member(name: string, controlType: FormControlType, ...validators: ValidatorFn[]): SimpleMember {
        return Model.defaultValueMember(name, '', controlType, ...validators);
    }

    static selectionMember(name: string, ...validators: ValidatorFn[]): SelectionMember {
        return new SelectionMember(name, validators);
    }

    static defaultValueMember(name: string, value: any, controlType: FormControlType, ...validators: ValidatorFn[]): SimpleMember {
        return new SimpleMember(controlType, name, validators, value);
    }

    static arrayMember(name: string, template: any, validator?: ValidatorFn): ArrayMember {
        return new ArrayMember(name, template, validator);
    }

    static groupMember(name: string, template: any, validator?: ValidatorFn): TemplatedMember {
        return new TemplatedMember(ModelElementTypes.group, FormControlType.group, name, template, validator);
    }

    private modelMemberToFormControl(fb: FormBuilder, member: ModelMemberBase): AbstractControl {
        switch (member.elementType) {
            case ModelElementTypes.array: return fb.array([(member as TemplatedMember).template.toFormGroup(fb)], (member.validators && member.validators.length) ? (member.validators as ValidatorFn[])[0] : null);
            case ModelElementTypes.control: return fb.control((member as SimpleMember).defaultValue, member.validators);
            case ModelElementTypes.page:
            case ModelElementTypes.group:
                return (member as TemplatedMember).template.toFormGroup(fb);
            default: throw new Error(`Invalid MemberType ${member.elementType}`);
        }
    }

    private collectMembers(fb: FormBuilder, members: ModelElement[]): any {
        return map(members, (member: ModelElement) => {
            if (member.elementType === ModelElementTypes.layout || member.elementType === ModelElementTypes.pageRoot) {
                return this.collectMembers(fb, (member as ContainerMember).members);
            }
            // if (member.elementType === ModelElementTypes.pageRoot) {
            //     return fb.group(this.createFormGroup(fb, (member as ContainerMember).members));
            // }
            return member;
        });
    }

    private createFormGroup(fb: FormBuilder, members: ModelElement[]): FormGroup {
        return fb.group(chain(this.collectMembers(fb, members))
            .flattenDeep()
            .filter((member: ModelElement) => member.elementType !== ModelElementTypes.button && member.elementType !== ModelElementTypes.submit)
            .map((member: ModelMemberBase) => [member.name, this.modelMemberToFormControl(fb, member)])
            .fromPairs()
            .value());
    }

    toFormGroup(fb: FormBuilder): FormGroup {
        return this.createFormGroup(fb, this.members);
    }

    toControlGroup(): ModelControl[] {
        return toControlGroup(this.members);
    }

}