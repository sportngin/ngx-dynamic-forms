import { ModelElementBuilder } from './model.element.builder';

export interface RootPageElementDef<T extends RootPageElementDef<T>> extends ModelElementBuilder<T> {

    prevText: string;
    nextText: string;

}