import { InjectionToken }   from '@angular/core';
import { FormGroup }        from '@angular/forms';

import { ModelControl }     from '../model/control/model.control';

export interface ElementData {
    form: FormGroup;
    control: ModelControl;
    displayOnly?: boolean
}

export const ELEMENT_DATA = new InjectionToken<ElementData>('ElementData');