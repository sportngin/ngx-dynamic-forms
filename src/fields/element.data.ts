import { InjectionToken }   from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

import { ModelControl, ModelMemberControl } from '../model/control/model.control';

export interface ElementData {

    form: FormGroup;
    control: ModelControl;
    formControl: AbstractControl;

    // checked?: boolean | (() => boolean);
    childControls?: ModelMemberControl[];
    dependentControls?: string[];
    // template?: any;

    [key: string]: any;

}

export const ELEMENT_DATA_PROVIDER = new InjectionToken<ElementData>('ElementData');