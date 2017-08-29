import { AbstractControl }  from '@angular/forms';

import { ElementData }          from '../elements/element.data';
import { ModelMemberControl }   from '../model/control/model.control';

export class FieldData extends ElementData {

    formControl: AbstractControl;

    childControls?: ModelMemberControl[];
    dependentControls?: string[];

    [key: string]: any;

}