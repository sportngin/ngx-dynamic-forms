import { ValidatorFn } from '@angular/forms';

import { ElementSiblingPosition }          from '../element.sibling.position';
import { ModelControl }             from '../element/model.control';
import { MemberType }               from './member.type';
import { ValidationDisplayMode }    from './validation.display.mode';

export interface ModelMember extends ModelControl {
    name: string;
    memberType: MemberType | string;
    validator: ValidatorFn;
    validators: ValidatorFn | ValidatorFn[];
    label: string;
    labelPosition: ElementSiblingPosition;
    /** determines whether the control created by this element will display validation styling **/
    validationDisplay: ValidationDisplayMode;
}