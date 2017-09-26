import { ButtonControl }        from './button.control';
import { ModelElementBuilder }  from './model.element.builder';

export interface RootPageElementDef<T extends RootPageElementDef<T>> extends ModelElementBuilder<T> {

    prevButton: ButtonControl;
    nextButton: ButtonControl;

}