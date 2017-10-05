import { ModelMemberBuilder }   from './model.member.builder';
import { TemplatedMember }      from './templated.member';

export interface TemplatedMemberBuilder<T extends TemplatedMemberBuilder<T>> extends TemplatedMember, ModelMemberBuilder<T> {

    addItemCssClass(...cssClasses: string[]): T;

}