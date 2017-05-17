import { Validators } from '@angular/forms';

import { FormControlType }  from '../src/ts/form.control.type';
import { Model }            from '../src/ts/model/model';

export class TestAppModelPage extends Model {

    constructor() {
        super(
            Model.textMember('textMember', Validators.required).addLabel('textMember'),
            Model.member('datePicker', FormControlType.date).addLabel('datePicker'),
            Model.selectionMember('prerequisite')
                .addLabel('prerequisite')
                .addData('data', [
                    { id: 1, name: 'option 1' },
                    { id: 2, name: 'option 2' }
                ])
                .addData('itemLabel', 'name')
                .addData('itemValue', 'id'),
            Model.selectionMember('dependentField')
                .addDependentControls('prerequisite')
                .addLabel('dependentField')
                .addData('data', (prerequisite: any) => {
                    return [
                        { id: 'a', name: `option ${prerequisite}-a`},
                        { id: 'b', name: `option ${prerequisite}-b`}
                    ]
                })
                .addData('itemLabel', 'name')
                .addData('itemValue', 'id')
        )
    }

}

export class TestAppModel extends Model {

    constructor() {
        super(
            Model.pages(
                Model.page('page1', new TestAppModelPage()),
                Model.page('page2', new TestAppModelPage())
            )
        )
    }

}