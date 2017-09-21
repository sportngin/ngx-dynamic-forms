import { AbstractControl }  from '@angular/forms';

import { ModelElement } from '../model/element';
import { ElementData }  from './element.data';

export class MemberData extends ElementData {

    elementId?: string;
    formControl: AbstractControl;

    children?: ModelElement[];
    dependentControls?: string[];

    [key: string]: any;

}