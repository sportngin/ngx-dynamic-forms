import { AbstractControl, FormBuilder, FormGroup, ValidatorFn } from '@angular/forms';

import { chain, map } from 'lodash';

import { ElementType, ModelElement, ContainerElement } from './element';
import { MemberType, ModelMember, SimpleMember, TemplatedMember } from './member';

export class ModelHelper {

    static modelMemberToFormControl(fb: FormBuilder, member: ModelMember): AbstractControl {
        switch (member.elementType) {

            case ElementType.input:
                if (member.memberType === MemberType.list) {
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
                return ModelHelper.collectMembers(fb, (member as ContainerElement).children);
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

    // static modelElementToModelControl(member: ModelElement, index?: number): ModelControl {
    //     if (member.elementType === ElementType.button) {
    //         return new ButtonControl(member as ButtonMember);
    //     }
    //     if (member.elementType === ElementType.layout) {
    //         return new LayoutControl(member as LayoutElement);
    //     }
    //     if (member.elementType === ElementType.page) {
    //         return new PageControl(member as PageMember, index);
    //     }
    //     if (member.elementType === ElementType.pageRoot) {
    //         return new RootPageControl(member as RootPageMember);
    //     }
    //     if (member.elementType === ElementType.input) {
    //         let modelMember = member as ModelMember;
    //         if (modelMember.MemberType === MemberType.list) {
    //             return new ArrayControl(member as ArrayMember);
    //         }
    //         if (modelMember.MemberType === MemberType.password) {
    //             return new PasswordControl(member as PasswordMember);
    //         }
    //     }
    //     return new ModelMemberControl(member as ModelMember);
    // }

    // static createModelControls(members: ModelElement[]): ModelControl[] {
    //     return map(members, ModelHelper.modelElementToModelControl);
    // }

}