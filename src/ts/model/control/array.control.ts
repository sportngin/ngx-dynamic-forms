import { ArrayMember }          from '../member/array.member';
import { ModelMemberControl }   from './model.control';

export class ArrayControl extends ModelMemberControl<ArrayMember> {

    constructor(member: ArrayMember) {
        super(member);

        this.canEditItem = member.canEditItem;
        this.canAddItem = member.canAddItem;
        this.canRemoveItem = member.canRemoveItem;
    }

    public canEditItem: boolean;
    public canAddItem: boolean;
    public canRemoveItem: boolean;

}