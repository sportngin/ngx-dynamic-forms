import { ElementType }      from '../element/element.type';
import { ElementPosition }  from '../element.position';
import { MemberType }       from './member.type';
import { ModelMemberBase }  from './model.member.base';

export class CheckboxMember extends ModelMemberBase<CheckboxMember> {

    constructor(name: string, checked?: boolean | (() => boolean)) {
        super(ElementType.input, MemberType.checkbox, name);

        this.checked = checked;
        this.labelPosition = ElementPosition.after;
    }

    public checked: boolean | (() => boolean);

}