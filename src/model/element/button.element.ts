import { DisableBehavior }  from '../disable.behavior';
import { FormText }         from '../form.text';
import { ButtonAction }     from './button.action';
import { ButtonClass }      from './button.class';
import { ButtonType }       from './button.type';
import { ElementType }      from './element.type';
import { ModelElementBase } from './model.element.base';

export class ButtonElement extends ModelElementBase<ButtonElement> implements DisableBehavior {

    constructor(buttonType: ButtonType, buttonAction: ButtonAction | string, buttonClass: ButtonClass, text: FormText, disableWhenInvalid: boolean = false) {
        super(ElementType.button);

        this.buttonType = buttonType;
        this.buttonAction = buttonAction;
        this.buttonClass = buttonClass;
        this.text = text;
        this.disableWhenInvalid = disableWhenInvalid;
    }

    public buttonType: ButtonType | string;
    public buttonAction: ButtonAction | string;
    public buttonClass: ButtonClass;
    public text: FormText;
    public disableWhenInvalid: boolean;
    public customDisabledHandler: boolean;

    public useCustomDisabledHandler(): ButtonElement {
        this.customDisabledHandler = true;
        return this;
    }

}