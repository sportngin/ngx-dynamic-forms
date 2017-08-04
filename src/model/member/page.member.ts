import { Observable } from 'rxjs/Observable';

import { FormControlType }                          from '../../form.control.type';
import { Model }                                    from '../model';
import { ModelElementBuilder, ModelElementType }    from '../model.element';
import { ContainerMemberBase }                      from './container.member';
import { TemplatedMember }                          from './templated.member';

export interface RootPageContainer<T extends RootPageContainer<T>> extends ModelElementBuilder<T> {

    prevText: string;
    nextText: string;

}

export interface RootPageMemberBuilder<T extends RootPageContainer<T>> extends RootPageContainer<T> {

    setPrevText(prevText: string): T;
    setNextText(nextText: string): T;

}

export class PageMember extends TemplatedMember {

    constructor(
        pageId: string | number,
        template: Model
    ) {
        super(ModelElementType.page, FormControlType.group, pageId.toString(), template);
    }

}

export class RootPageMember extends ContainerMemberBase<RootPageMember> implements RootPageMemberBuilder<RootPageMember> {

    constructor(
        public startPage: Observable<number>,
        public updatePage: (pageIndex: number) => void,
        members: PageMember[]
    ) {
        super(ModelElementType.pageRoot, members);
    }

    public setPrevText(prevText: string): RootPageMember {
        this.prevText = prevText;
        return this;
    }

    public setNextText(nextText: string): RootPageMember {
        this.nextText = nextText;
        return this;
    }

    public prevText: string = 'Prev';
    public nextText: string = 'Next';

}