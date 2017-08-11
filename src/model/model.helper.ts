import { AbstractControl, FormBuilder, FormGroup, ValidatorFn } from '@angular/forms';

import { chain, map } from 'lodash';

import { ElementType }                      from '../element.type';
import { FieldType }                        from '../field.type';
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
import { ModelMember }                      from './member/model.member';
import { PageMember, RootPageMember }       from './member/page.member';
import { PasswordMember }                   from './member/password.member';
import { SimpleMember }                     from './member/simple.member';
import { TemplatedMember }                  from './member/templated.member';
import { ModelElement }                     from './model.element';

export class ModelHelper {

    static modelMemberToFormControl(fb: FormBuilder, member: ModelMember): AbstractControl {
        switch (member.elementType) {

            case ElementType.input:
                if (member.fieldType === FieldType.list) {
                    return fb.array([(member as TemplatedMember).template.toFormGroup(fb)], member.validator);
                }
                return (member as SimpleMember).createFormControl();

            // case ElementType.group:
            case ElementType.page:
                return (member as TemplatedMember).template.toFormGroup(fb);

            default: throw new Error(`Invalid MemberType ${member.elementType}`);
        }
    }

    private static collectMembers(fb: FormBuilder, members: ModelElement[]): any {
        return map(members, (member: ModelElement) => {
            if (member.elementType === ElementType.layout || member.elementType === ElementType.pageRoot) {
                return ModelHelper.collectMembers(fb, (member as ContainerMember).members);
            }
            return member;
        });
    }

    static createFormGroup(fb: FormBuilder, members: ModelElement[], validator: ValidatorFn): FormGroup {
        return fb.group(chain(ModelHelper.collectMembers(fb, members))
            .flattenDeep()
            .filter((member: ModelElement) =>
                member.elementType !== ElementType.button //&&
                // member.elementType !== ElementType.submit &&
                // member.elementType !== ElementType.validator
            )
            .map((member: ModelMember) => [member.name, ModelHelper.modelMemberToFormControl(fb, member)])
            .fromPairs()
            .value(), { validator });
    }

    static modelElementToModelControl(member: ModelElement, index?: number): ModelControl {
        if (member.elementType === ElementType.button) {
            return new ButtonControl(member as ButtonMember);
        }
        if (member.elementType === ElementType.layout) {
            return new LayoutControl(member as LayoutMember);
        }
        if (member.elementType === ElementType.page) {
            return new PageControl(member as PageMember, index);
        }
        if (member.elementType === ElementType.pageRoot) {
            return new RootPageControl(member as RootPageMember);
        }
        if (member.elementType === ElementType.input) {
            let modelMember = member as ModelMember;
            if (modelMember.fieldType === FieldType.list) {
                return new ArrayControl(member as ArrayMember);
            }
            if (modelMember.fieldType === FieldType.password) {
                return new PasswordControl(member as PasswordMember);
            }
        }
        return new ModelMemberControl(member as ModelMember);
    }

    static createModelControls(members: ModelElement[]): ModelControl[] {
        return map(members, ModelHelper.modelElementToModelControl);
    }

}