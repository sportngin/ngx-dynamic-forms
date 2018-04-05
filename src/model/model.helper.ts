import { AbstractControl, FormBuilder, FormGroup, ValidatorFn } from '@angular/forms';

import { flattenDeep, fromPairs } from 'lodash-es';

import { ElementType, ModelElement, ContainerControl } from './element';
import { MemberType, ModelMember, SimpleMember, TemplatedMember } from './member';

export class ModelHelper {

    constructor(private fb: FormBuilder) {
        this.collectMember = this.collectMember.bind(this)
    }

    modelMemberToFormControl(member: ModelMember): AbstractControl {
        switch (member.elementType) {

            case ElementType.input:
                if (member.memberType === MemberType.list) {
                    return this.fb.array([(member as TemplatedMember).template.toFormGroup(this.fb)], member.validator);
                }
                return (member as SimpleMember).createFormControl();

            // case ElementType.group:
            case ElementType.page:
                return (member as TemplatedMember).template.toFormGroup(this.fb);

            default: throw new Error(`Invalid MemberType ${member.elementType}`);
        }
    }

    private collectMember(member: ModelElement) {
        if (member.elementType === ElementType.layout || member.elementType === ElementType.pageRoot) {
            return this.collectMembers((member as ContainerControl).children);
        }
        return member;
    }

    private collectMembers(members: ModelElement[]): any {
        return members.map(this.collectMember);
    }

    public createFormGroup(members: ModelElement[], validator: ValidatorFn): FormGroup {
        const collectedMembers = flattenDeep(this.collectMembers(members))
            .filter((member: ModelElement) =>
                member.elementType !== ElementType.button //&&
                // member.elementType !== ElementType.submit &&
                // member.elementType !== ElementType.validator
            );

        const group = fromPairs(
            collectedMembers
                .map((member: ModelMember) => [member.name, this.modelMemberToFormControl(member)])
        );

        return this.fb.group(group,{ validator });
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