import { Validators } from '@angular/forms';

import { FormControlType }  from '../src/ts/form.control.type';
import { Model }            from '../src/ts/model/model';

export class TestAppModelSimpleFields extends Model {

    constructor() {
        super(
            Model.textMember('textMember', Validators.required).addLabel('textMember'),
        );
    }

}

export class TestAppModelComplicatedFields extends Model {

    constructor() {
        super(
            Model.member('datePicker', FormControlType.date).addLabel('datePicker')
        )
    }

}

export class TestAppModel extends Model {

    constructor() {
        super(
            Model.pages(
                Model.page('simple', new TestAppModelSimpleFields()),
                Model.page('complicated', new TestAppModelComplicatedFields())
            )
        )
    }

}