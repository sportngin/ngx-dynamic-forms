import { Component } from '@angular/core';

import { hostProvides } from '@siplay/ng-dynamic-forms';

import { FieldTestComponent }   from '../field.test.component';
import { ListTestModel }        from './list.test.model';

@Component({
    selector: 'list-test',
    templateUrl: '../field.test.pug',
    viewProviders: [
        hostProvides(ListTestComponent)
    ]
})
export class ListTestComponent extends FieldTestComponent {

    constructor() {
        super(new ListTestModel());
    }

    afterFormInit(): void {
        this.injectControlValue(this.form.controls['list'], [{ cantTouchThis: true, name: `can't touch this` }]);
    }

    protected get fieldName() {
        return 'List';
    }

    protected get modelSourcePath() {
        return 'test/app/fields/dropdown/list.test.model.ts';
    }

}