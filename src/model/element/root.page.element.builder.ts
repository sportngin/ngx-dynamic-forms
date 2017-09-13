import { RootPageElementDef } from './root.page.element.def';

export interface RootPageElementBuilder<T extends RootPageElementDef<T>> extends RootPageElementDef<T> {

    setPrevText(prevText: string): T;
    setNextText(nextText: string): T;

}