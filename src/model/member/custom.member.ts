import { ValidatorFn } from '@angular/forms';

import { ElementType }          from '../element/element.type';
import { MemberType }           from './member.type';
import { ModelMember }          from './model.member';
import { ModelMemberBase }      from './model.member.base';
import { ModelMemberBuilder }   from './model.member.builder';

export interface CustomMember extends ModelMember {

    data: { [key: string]: any }

}

export interface CustomMemberBuilder extends ModelMemberBuilder<CustomMemberBuilder>, CustomMember {

    addData(key: string, value: any): CustomMemberBuilder;

}

export class CustomMemberBase extends ModelMemberBase<CustomMemberBase> implements CustomMemberBuilder {

    public data: { [key: string]: any };

    constructor(memberType: MemberType | string, name: string, ...validators: ValidatorFn[]) {
        super(ElementType.input, memberType, name, validators)
    }

    public addData(key: string, value: any): CustomMemberBase {
        if (!this.data) {
            this.data = {};
        }
        this.data[key] = value;
        return this;
    }

}