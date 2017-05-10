import { ButtonMember }     from '../member/button.member';
import { ModelControlBase } from './model.control';

export class ButtonControl extends ModelControlBase<ButtonMember> {

    constructor(member: ButtonMember) {
        super(member);

        this.member = member;
    }

    public member: ButtonMember;

}