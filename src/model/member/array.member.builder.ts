import { ArrayItemPermission, ArrayMember } from './array.member';
import { LabelDisplayOptions }              from './label.display.options';
import { TemplatedMemberBuilder }           from './templated.member.builder';

export interface ArrayMemberBuilder extends ArrayMember, TemplatedMemberBuilder<ArrayMemberBuilder> {

    configureItemLabels(options: LabelDisplayOptions): ArrayMemberBuilder;
    allowEditItem(allowEditItem: ArrayItemPermission): ArrayMemberBuilder;
    allowAddItem(allowAddItem: boolean): ArrayMemberBuilder;
    allowRemoveItem(allowRemoveItem: ArrayItemPermission): ArrayMemberBuilder;

}