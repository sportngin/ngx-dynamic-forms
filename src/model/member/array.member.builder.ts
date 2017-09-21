import { ArrayItemPermission, ArrayMember } from './array.member';
import { TemplatedMemberBuilder }           from './templated.member.builder';

export interface ArrayMemberBuilder extends ArrayMember, TemplatedMemberBuilder<ArrayMemberBuilder> {

    rendersHeaderRow(renderHeaderRow: boolean, keepControlLabels?: boolean): ArrayMemberBuilder;
    allowEditItem(allowEditItem: ArrayItemPermission): ArrayMemberBuilder;
    allowAddItem(allowAddItem: boolean): ArrayMemberBuilder;
    allowRemoveItem(allowRemoveItem: ArrayItemPermission): ArrayMemberBuilder;

}