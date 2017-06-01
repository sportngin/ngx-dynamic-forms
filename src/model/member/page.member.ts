import { FormControlType }                          from '../../form.control.type';
import { Model }                                    from '../model';
import { ModelElementBuilder, ModelElementTypes }   from '../model.element';
import { ContainerMember }                          from './container.member';
import { TemplatedMember }                          from './templated.member';

export interface RootPageContainer extends ModelElementBuilder {

    prevText: string;
    nextText: string;

}

export interface RootPageMemberBuilder extends RootPageContainer {

    setPrevText(prevText: string): RootPageMemberBuilder;
    setNextText(nextText: string): RootPageMemberBuilder;

}

export class PageMember extends TemplatedMember {

    constructor(
        pageId: string | number,
        template: Model
    ) {
        super(ModelElementTypes.page, FormControlType.group, pageId.toString(), template);
    }

}

export class RootPageMember extends ContainerMember implements RootPageMemberBuilder {

    constructor(
        members: PageMember[]
    ) {
        super(ModelElementTypes.pageRoot, members);
    }

    public setPrevText(prevText: string): RootPageMemberBuilder {
        this.prevText = prevText;
        return this;
    }

    public setNextText(nextText: string): RootPageMemberBuilder {
        this.nextText = nextText;
        return this;
    }

    public prevText: string = 'Prev';
    public nextText: string = 'Next';

}