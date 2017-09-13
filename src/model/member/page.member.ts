import { ElementType }          from '../element/element.type';
import { Model }                from '../model';
import { MemberType }           from './member.type';
import { TemplatedMember }      from './templated.member';

export class PageMember extends TemplatedMember {

    constructor(
        pageId: string | number,
        template: Model
    ) {
        super(ElementType.page, MemberType.group, pageId.toString(), template);
    }

}