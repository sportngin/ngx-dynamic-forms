import { FormText }             from '../form.text';
import { ButtonAction }         from './button.action';
import { ButtonType }           from './button.type';
import { ModelControl }         from './model.control';
import { InlineElementSibling } from './inline.element.sibling';

export interface ButtonControl extends ModelControl {

    buttonType: ButtonType | string;
    buttonAction: ButtonAction | string;
    text: FormText;
    textSiblings: InlineElementSibling[];
    disableWhenInvalid: boolean;
    customDisabledHandler: boolean;

}