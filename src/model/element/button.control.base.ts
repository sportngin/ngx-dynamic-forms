import { DisableBehavior }  from '../disable.behavior';
import { FormText }         from '../form.text';
import { ButtonAction }     from './button.action';
import { ButtonType }       from './button.type';
import { ElementType }      from './element.type';
import { ModelControlBase } from './model.control.base';
import { ButtonControlBuilder } from './button.control.builder';
import { InlineElementSiblingBase } from './inline.element.sibling.base';
import { ModelElementSibling } from './model.element.sibling';
import { InlineElementSibling } from './inline.element.sibling';
import { ElementSiblingPosition } from '../element.sibling.position';

export class ButtonControlBase extends ModelControlBase<ButtonControlBase> implements DisableBehavior, ButtonControlBuilder {

    constructor(buttonType: ButtonType, buttonAction: ButtonAction | string, text: FormText, disableWhenInvalid: boolean) {
        super(ElementType.button, null, [
            `${ElementType.button}-${buttonType}`,
            `${ElementType.button}-${buttonAction}`,
            `${ElementType.button}-${buttonType}-${buttonAction}`
        ]);

        this.buttonType = buttonType;
        this.buttonAction = buttonAction;
        this.text = text;
        this.disableWhenInvalid = disableWhenInvalid;
    }

    public buttonType: ButtonType | string;
    public buttonAction: ButtonAction | string;
    public text: FormText;
    public textSiblings: InlineElementSibling[];
    public disableWhenInvalid: boolean;
    public customDisabledHandler: boolean;

    public useCustomDisabledHandler(): ButtonControlBase {
        this.customDisabledHandler = true;
        return this.self;
    }

    public prependTextWith(cssClass?: string, text?: string): ButtonControlBase {
        return this.addTextSibling(new InlineElementSiblingBase(ElementSiblingPosition.before, cssClass, text));
    }

    public appendTextWith(cssClass?: string, text?: string): ButtonControlBase {
        return this.addTextSibling(new InlineElementSiblingBase(ElementSiblingPosition.after, cssClass, text));
    }

    public addTextSibling<TSibling extends ModelElementSibling>(...sibling: TSibling[]): ButtonControlBase {
        if (!this.textSiblings) {
            this.textSiblings = [];
        }
        this.textSiblings.push(...sibling);
        return this.self;
    }

}