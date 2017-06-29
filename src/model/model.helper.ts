import { AbstractControl, FormBuilder, FormGroup, ValidatorFn } from '@angular/forms';

import { chain, map } from 'lodash';

import { ArrayControl }                     from './control/array.control';
import { ButtonControl }                    from './control/button.control';
import { LayoutControl }                    from './control/layout.control';
import { ModelControl, ModelMemberControl } from './control/model.control';
import { PageControl, RootPageControl }     from './control/page.control';
import { PasswordControl }                  from './control/password.control';
import { ArrayMember }                      from './member/array.member';
import { ButtonMember }                     from './member/button.member';
import { ContainerMember }                  from './member/container.member';
import { LayoutMember }                     from './member/layout.member';
import { ModelMemberBase }                  from './member/model.member';
import { PageMember, RootPageMember }       from './member/page.member';
import { PasswordMember }                   from './member/password.member';
import { SimpleMember }                     from './member/simple.member';
import { TemplatedMember }                  from './member/templated.member';
import { ModelElement, ModelElementTypes }  from './model.element';

export class ModelHelper {

    static modelMemberToFormControl(fb: FormBuilder, member: ModelMemberBase): AbstractControl {
        switch (member.elementType) {
            case ModelElementTypes.array: return fb.array([(member as TemplatedMember).template.toFormGroup(fb)], member.validator);
            case ModelElementTypes.control: return (member as SimpleMember).createFormControl();
            case ModelElementTypes.page:
            case ModelElementTypes.group:
                return (member as TemplatedMember).template.toFormGroup(fb);
            default: throw new Error(`Invalid MemberType ${member.elementType}`);
        }
    }

    private static collectMembers(fb: FormBuilder, members: ModelElement[]): any {
        return map(members, (member: ModelElement) => {
            if (member.elementType === ModelElementTypes.layout || member.elementType === ModelElementTypes.pageRoot) {
                return ModelHelper.collectMembers(fb, (member as ContainerMember).members);
            }
            return member;
        });
    }

    static createFormGroup(fb: FormBuilder, members: ModelElement[]): FormGroup {
        return fb.group(chain(ModelHelper.collectMembers(fb, members))
            .flattenDeep()
            .filter((member: ModelElement) => member.elementType !== ModelElementTypes.button && member.elementType !== ModelElementTypes.submit)
            .map((member: ModelMemberBase) => [member.name, ModelHelper.modelMemberToFormControl(fb, member)])
            .fromPairs()
            .value());
    }

    static modelElementToModelControl(member: ModelElement, index?: number): ModelControl {
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
    }

    static createModelControls(members: ModelElement[]): ModelControl[] {
        return map(members, ModelHelper.modelElementToModelControl);
    }

}