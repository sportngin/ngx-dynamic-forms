import { PageMember, RootPageMember }   from '../member/page.member';
import { toControlGroup }               from '../model';
import { ModelControlBase }             from './model.control';

export class PageControl extends ModelControlBase<PageMember> {
    constructor(container: PageMember | RootPageMember, pageIndex: number | null = null) {
        super(container);

        this.childControls = toControlGroup(container.members);
        this.pageIndex = pageIndex;
    }

    public pageIndex: number | null;
}