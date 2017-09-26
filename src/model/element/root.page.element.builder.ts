import { FormText }             from '../form.text';
import { ButtonClass }          from './button.class';
import { ButtonControlBuilder } from './button.control.builder';
import { RootPageElementDef }   from './root.page.element.def';

export interface RootPageElementBuilder<T extends RootPageElementDef<T>> extends RootPageElementDef<T> {

    setNextButton(text: FormText, buttonClass?: ButtonClass | string, buttonConfig?: (button: ButtonControlBuilder) => ButtonControlBuilder): T;
    setPrevButton(text: FormText, buttonClass?: ButtonClass | string, buttonConfig?: (button: ButtonControlBuilder) => ButtonControlBuilder): T;
    configNextButton(buttonConfig: (button: ButtonControlBuilder) => ButtonControlBuilder): T;
    configPrevButton(buttonConfig: (button: ButtonControlBuilder) => ButtonControlBuilder): T;
}