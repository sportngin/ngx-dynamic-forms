import { FormBuilder, FormControl } from '@angular/forms';

import { FormHostComponent }    from '../src/component';
import { Model }                from '../src/model';

export class FauxModel extends Model { }

export class FauxComponentHost extends FormHostComponent {

    constructor() {
        super(new FauxModel());
    }

    protected doSubmit(): Promise<any> {
        return Promise.resolve(null);
    }
}

export const FORM_COMPONENT_HOST_PROVIDERS = [
    FormBuilder,
    { provide: FormHostComponent, useClass: FauxComponentHost },
    { provide: 'formControl', useValue: new FormControl('') }
];