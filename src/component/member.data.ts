import { AbstractControl }  from '@angular/forms';

import { ModelElement } from '../model/element';
import { ElementData }  from './element.data';

export class MemberData extends ElementData {

    formControl: AbstractControl;

    children?: ModelElement[];
    dependentControls?: string[];
    labelRendered?: boolean;

    [key: string]: any;

}