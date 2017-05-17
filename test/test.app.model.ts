import { Model } from '../src/ts/model/model';
import { FormControlType } from '../src/ts/form.control.type';

export class TestAppModelSimpleFields extends Model {

    constructor() {
        super(
            Model.textMember('textMember'),
        );
    }

}

export class TestAppModelComplicatedFields extends Model {

    constructor() {
        super(
            Model.member('datePicker', FormControlType.date)
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