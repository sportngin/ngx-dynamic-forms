import { Component } from '@angular/core';

import { FormComponentHost, hostProvides } from '../src/ts/form.component.host';
import { TestAppModel } from './test.app.model';

@Component({
    selector: 'test-app',
    templateUrl: './test.app.pug',
    viewProviders: [hostProvides(TestAppComponent)]
})
export class TestAppComponent extends FormComponentHost {

    constructor() {
        super(new TestAppModel());

        console.log('TestAppComponent.ctr', this.modelDef);
    }

    protected afterFormInit() {
        console.log('TestAppComponent.afterFormInit', this.form);
    }

    protected doSubmit(): void {
    }

}