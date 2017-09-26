import { AbstractControl }  from '@angular/forms';

import { ModelElement } from '../model/element';
import { ModelMember }  from '../model/member';
import { ElementData }  from './element.data';

export class MemberData<TMember extends ModelMember = ModelMember> extends ElementData<TMember> {

    elementId?: string;
    formControl: AbstractControl;

    children?: ModelElement[];
    dependentControls?: string[];

    [key: string]: any;

}