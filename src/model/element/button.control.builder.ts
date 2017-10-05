import { ButtonControl }        from './button.control';
import { ModelControlBuilder } from './model.control.builder';

export interface ButtonControlBuilder extends ModelControlBuilder<ButtonControlBuilder>, ButtonControl {

    useCustomDisabledHandler(): ButtonControlBuilder;
    prependTextWith(cssClass?: string, text?: string): ButtonControlBuilder;
    appendTextWith(cssClass?: string, text?: string): ButtonControlBuilder;

}