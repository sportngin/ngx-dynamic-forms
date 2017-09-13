import { FormGroup }    from '@angular/forms';

import { ModelElement } from '../model/element';

export class ElementData {
    form: FormGroup;
    element: ModelElement;
    displayOnly?: boolean;
    createsHelpers?: boolean = true;
}