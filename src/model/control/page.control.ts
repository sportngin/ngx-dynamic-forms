import { Observable } from 'rxjs/Observable';

import { PageMember, RootPageMember }           from '../member/page.member';
import { ModelHelper }                          from '../model.helper';
import { ModelControlBase, ModelMemberControl } from './model.control';

export class RootPageControl extends ModelControlBase<RootPageMember> {
    constructor(container: RootPageMember) {
        super(container);

        this.childControls = ModelHelper.createModelControls(container.members);
        this.startPage = container.startPage;
        this.updatePage = container.updatePage;
    }

    public startPage: Observable<number>;
    public updatePage: (pageIndex: number) => void;
}

export class PageControl extends ModelMemberControl<PageMember> {
    constructor(container: PageMember, pageIndex: number) {
        super(container);

        this.pageIndex = pageIndex;
    }

    public pageIndex: number | null;
}