import { FormText, mergeFormText }  from '../../form.text';
import { ButtonMember }             from '../member/button.member';
import { ModelControlBase }         from './model.control';
import { DisableBehavior } from '../disable.behavior';

export class ButtonControl extends ModelControlBase<ButtonMember> implements DisableBehavior {

    constructor(member: ButtonMember) {
        super(member);

        this.member = member;
        this.text = mergeFormText(member.text);
    }

    public member: ButtonMember;
    public readonly text: FormText;
    get disableWhenInvalid(): boolean { return this.member.disableWhenInvalid; }
    get customDisabledHandler(): boolean { return this.member.customDisabledHandler; }

}