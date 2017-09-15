import { Observable } from 'rxjs/Observable';

import { ContainerControlBase }     from './container.control.base';
import { ElementType }              from './element.type';
import { RootPageElementBuilder }   from './root.page.element.builder';
import { PageMember }               from '../member/page.member';

export class RootPageElement extends ContainerControlBase<RootPageElement> implements RootPageElementBuilder<RootPageElement> {

    constructor(
        public startPage: Observable<number>,
        public updatePage: (pageIndex: number) => void,
        pages: PageMember[]
    ) {
        super(ElementType.pageRoot, pages);

        pages.forEach((page, pageIndex) => page.pageIndex = pageIndex);
    }

    public setPrevText(prevText: string): RootPageElement {
        this.prevText = prevText;
        return this;
    }

    public setNextText(nextText: string): RootPageElement {
        this.nextText = nextText;
        return this;
    }

    public children: PageMember[];

    public prevText: string = 'Prev';
    public nextText: string = 'Next';

}