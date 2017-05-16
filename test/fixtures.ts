import { FormBuilder, FormControl } from '@angular/forms';

import { FormComponentHost }    from '../src/ts/form.component.host';
import { Model }                from '../src/ts/model/model';

export class FauxModel extends Model { }

export class FauxComponentHost extends FormComponentHost {

    constructor() {
        super(new FauxModel());
    }

    protected doSubmit(): void {
    }
}

export const FORM_COMPONENT_HOST_PROVIDERS = [
    FormBuilder,
    { provide: FormComponentHost, useClass: FauxComponentHost },
    { provide: 'formControl', useValue: new FormControl() }
];