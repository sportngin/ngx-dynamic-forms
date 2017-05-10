import { PasswordMember }       from '../member/password.member';
import { ModelMemberControl }   from './model.control';

export class PasswordControl extends ModelMemberControl<PasswordMember> {

    constructor(member: PasswordMember) {
        super(member);

        this.canShowPassword = member.canShowPassword;
    }

    public canShowPassword: boolean;

}