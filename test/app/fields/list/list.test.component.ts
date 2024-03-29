import { Component, ViewEncapsulation } from '@angular/core';
import { AbstractControl }              from '@angular/forms';

import { hostProviders } from '@siplay/ng-dynamic-forms';

import { FieldTestComponent }   from '../field.test.component';
import { ListTestModel }        from './list.test.model';

@Component({
    selector: 'list-test',
    templateUrl: '../field.test.component.pug',
    viewProviders: [
        hostProviders(ListTestComponent)
    ],
    styleUrls: ['./list.test.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ListTestComponent extends FieldTestComponent {

    constructor() {
        super(new ListTestModel());
    }

    afterFormInit(): void {
        this.injectControlValue(this.form.controls['list'], [
            { cantTouchThis: true, name: `can't touch this` }
        ]);
    }

    public get fieldName() {
        return 'List';
    }

    public get modelSourcePath() {
        return 'test/app/fields/dropdown/list.test.model.ts';
    }

    public isChildRendered(form: AbstractControl, key?: string): boolean {
        if (key === 'cant-touch-this') {
            return form.value.cantTouchThis;
        }

        return super.isChildRendered(form, key);
    }
}
