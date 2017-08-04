import { Observable } from 'rxjs/Observable';

import { Model } from '@siplay/ng-dynamic-forms';

export class PageOneModel extends Model {
    constructor() {
        super(Model.textMember('fieldOne').addLabel('Field One'));
    }
}

export class PageTwoModel extends Model {
    constructor() {
        super(Model.textMember('fieldTwo').addLabel('Field Two'));
    }
}

export class PageThreeModel extends Model {
    constructor() {
        super(Model.textMember('fieldThree').addLabel('Field Three'));
    }
}

export class PageTestModel extends Model {

    constructor(startPage: Observable<number>, updatePage: (pageIndex: number) => void) {
        super(
            Model.pages(startPage, updatePage,
                Model.page('pageOne', new PageOneModel()),
                Model.page('pageTwo', new PageTwoModel()),
                Model.page('pageThree', new PageThreeModel())
            )
        );
    }
}