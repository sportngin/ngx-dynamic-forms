import { Inject, Injectable } from '@angular/core';

import { DYNAMIC_FORMS_CONFIG, DynamicFormsConfig } from './dynamic.forms.config';

import { MemberType }           from '../model/member/member.type';
import { TypeMappingService }   from './type.mapping.service';

const CONFIG_KEY: string = 'members';

@Injectable()
export class MemberTypeMappings extends TypeMappingService<MemberType> {
    constructor(
        @Inject(DYNAMIC_FORMS_CONFIG) config: DynamicFormsConfig
    ) {
        super(CONFIG_KEY, config);
    }
}