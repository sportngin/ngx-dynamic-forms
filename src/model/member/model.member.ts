import { ValidatorFn } from '@angular/forms';

import { ElementPosition }  from '../element.position';
import { ModelControl }     from '../element/model.control';
import { MemberType }       from './member.type';

export interface ModelMember extends ModelControl {
    name: string;
    memberType: MemberType | string;
    validator: ValidatorFn;
    validators: ValidatorFn | ValidatorFn[];
    label: string;
    labelPosition: ElementPosition;
    /** determines whether the control created by this element will display validation styling **/
    displaysValidation: boolean;
}