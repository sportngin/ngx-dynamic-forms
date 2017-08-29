import { FormGroup }    from '@angular/forms';
import { ModelControl } from '../model/control/model.control';

export class ElementData {
    form: FormGroup;
    control: ModelControl;
    displayOnly?: boolean
}