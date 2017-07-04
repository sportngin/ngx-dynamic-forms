import { FormBuilder, FormControl } from '@angular/forms';

import { FormComponentHost }    from '../src/form.component.host';
import { Model }                from '../src/model/model';

export class FauxModel extends Model { }

export class FauxComponentHost extends FormComponentHost {

    constructor() {
        super(new FauxModel());
    }

    protected doSubmit(): Promise<any> {
        return Promise.resolve(null);
    }
}

export const FORM_COMPONENT_HOST_PROVIDERS = [
    FormBuilder,
    { provide: FormComponentHost, useClass: FauxComponentHost },
    { provide: 'formControl', useValue: new FormControl('') }
];