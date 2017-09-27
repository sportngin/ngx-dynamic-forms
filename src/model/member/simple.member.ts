import { FormControl, ValidatorFn } from '@angular/forms';

import { ElementType }      from '../element';
import { MemberType }       from '../member';
import { ModelMember }      from './model.member';
import { ModelMemberBase }  from './model.member.base';
import { ModelMemberBuilder } from './model.member.builder';

export interface SimpleMember extends ModelMember {
    defaultValue: any;
    createFormControl(): FormControl;
}

export interface SimpleMemberBuilderBase<TSelf extends SimpleMemberBuilderBase<TSelf>>
    extends ModelMemberBuilder<TSelf>, SimpleMember {

    useDefaultValue(defaultValue: any ): TSelf;

}

export interface SimpleMemberBuilder extends SimpleMemberBuilderBase<SimpleMemberBuilder> {

}

export class SimpleMemberBase<TSelf extends SimpleMemberBase<TSelf>>
    extends ModelMemberBase<TSelf>
    implements SimpleMemberBuilderBase<TSelf>, SimpleMemberBuilder {

    constructor(memberType: MemberType | string, name: string, validators?: ValidatorFn | ValidatorFn[], defaultValue?: any) {
        super(ElementType.input, memberType, name, validators);
        this.defaultValue = defaultValue;
    }

    public defaultValue: any;

    public useDefaultValue(defaultValue: any): TSelf {
        this.defaultValue = defaultValue;
        return this.self;
    }

    public createFormControl(): FormControl {
        return new FormControl(this.defaultValue, this.validators);
    }

}