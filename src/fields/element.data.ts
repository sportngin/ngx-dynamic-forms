import { InjectionToken }   from '@angular/core';
import { AbstractControl }  from '@angular/forms';

import { ElementData }          from '../elements/element.data';
import { ModelMemberControl }   from '../model/control/model.control';

export interface FieldData extends ElementData {

    formControl: AbstractControl;

    childControls?: ModelMemberControl[];
    dependentControls?: string[];

    [key: string]: any;

}

export const FIELD_DATA_PROVIDER = new InjectionToken<FieldData>('FieldData');