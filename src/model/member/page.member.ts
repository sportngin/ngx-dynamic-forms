import { ElementType }          from '../element/element.type';
import { Model }                from '../model';
import { MemberType }           from './member.type';
import { TemplatedMemberBase }  from './templated.member.base';

export class PageMember extends TemplatedMemberBase<PageMember> {

    public pageIndex: number;

    constructor(
        pageId: string | number,
        template: Model
    ) {
        super(ElementType.page, MemberType.group, pageId.toString(), template);
    }

}