import { ButtonType }               from '../../elements/button.type';
import { FormText, mergeFormText }  from '../../form.text';
import { DisableBehavior }          from '../disable.behavior';
import { ButtonMember }             from '../member/button.member';
import { ModelControlBase }         from './model.control';

export class ButtonControl extends ModelControlBase<ButtonMember> implements DisableBehavior {

    constructor(member: ButtonMember) {
        super(member);

        this.buttonType = member.buttonType;
        this.member = member;
        this.text = mergeFormText(member.text);
    }

    public buttonType: ButtonType | string;
    public member: ButtonMember;
    public readonly text: FormText;
    get disableWhenInvalid(): boolean { return this.member.disableWhenInvalid; }
    get customDisabledHandler(): boolean { return this.member.customDisabledHandler; }

}