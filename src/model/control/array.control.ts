import { ArrayItemPermission, ArrayMember } from '../member/array.member';
import { ModelMemberControl }               from './model.control';

export class ArrayControl extends ModelMemberControl<ArrayMember> {

    constructor(member: ArrayMember) {
        super(member);

        this.canEditItem = member.canEditItem;
        this.canAddItem = member.canAddItem;
        this.canRemoveItem = member.canRemoveItem;
        this.itemCssClasses = member.itemCssClasses;
    }

    public canAddItem: boolean;
    public canEditItem: ArrayItemPermission;
    public canRemoveItem: ArrayItemPermission;
    public itemCssClasses: string[];

    public getPermission(hasPermission: ArrayItemPermission, value: any): boolean {
        if (typeof hasPermission === 'boolean') {
            return hasPermission as boolean;
        }

        return hasPermission(value);
    }

}