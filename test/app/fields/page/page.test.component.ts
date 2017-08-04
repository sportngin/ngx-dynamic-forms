import { Component }                from '@angular/core';
import { AbstractControl }          from '@angular/forms';
import { ActivatedRoute, Router }   from '@angular/router';

import 'rxjs/add/operator/toPromise';

import { behaviorProvider, BehaviorType, hostProviders, IsDisabledHandler } from '@siplay/ng-dynamic-forms';

import { FieldTestComponent }   from '../field.test.component';
import { PageTestModel }        from './page.test.model';

@Component({
    selector: 'form-test',
    templateUrl: '../field.test.pug',
    viewProviders: [
        hostProviders(PageTestComponent),
        behaviorProvider(PageTestComponent, BehaviorType.isDisabled),
        { provide: 'error', useExisting: PageTestComponent }
    ]
})
export class PageTestComponent extends FieldTestComponent implements IsDisabledHandler {

    constructor(
        route: ActivatedRoute,
        private router: Router
    ) {
        super(new PageTestModel(
            route.params.map(params => params.page),
            pageIndex => this.router.navigate(['field/paged', { page: pageIndex }])
        ));
    }

    protected get fieldName() {
        return 'Paged';
    }

    protected get modelSourcePath() {
        return 'test/app/fields/page/page.test.model.ts';
    }

    public isDisabled(form: AbstractControl): boolean {
        return false;
    }

}