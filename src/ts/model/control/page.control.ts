import { PageMember, RootPageMember }           from '../member/page.member';
import { toControlGroup }                       from '../model';
import { ModelControlBase, ModelMemberControl } from './model.control';

export class RootPageControl extends ModelControlBase<RootPageMember> {
    constructor(container: RootPageMember) {
        super(container);

        this.childControls = toControlGroup(container.members);
    }
}

export class PageControl extends ModelMemberControl<PageMember> {
    constructor(container: PageMember, pageIndex: number) {
        super(container);

        this.pageIndex = pageIndex;
    }

    public pageIndex: number | null;
}