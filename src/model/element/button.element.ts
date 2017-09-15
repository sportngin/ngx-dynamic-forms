import { DisableBehavior }  from '../disable.behavior';
import { FormText }         from '../form.text';
import { ButtonAction }     from './button.action';
import { ButtonClass }      from './button.class';
import { ButtonType }       from './button.type';
import { ElementType }      from './element.type';
import { ModelControlBase } from './model.control.base';

export class ButtonControl extends ModelControlBase<ButtonControl> implements DisableBehavior {

    constructor(buttonType: ButtonType, buttonAction: ButtonAction | string, buttonClass: ButtonClass, text: FormText, disableWhenInvalid: boolean = false) {
        super(ElementType.button, null, [`${ElementType.button}-${buttonType}-${buttonAction}`]);

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

    public useCustomDisabledHandler(): ButtonControl {
        this.customDisabledHandler = true;
        return this;
    }

}