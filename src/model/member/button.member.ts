import { FormText }                         from '../../form.text';
import { DisableBehavior }                  from '../disable.behavior';
import { ElementHelper, ModelElementType }  from '../model.element';
import { ModelElementBase }                 from '../model.element.base';

export enum ButtonClass {
    primary = 'primary',
    secondary = 'secondary',
    default = 'default',
    success = 'success',
    warning = 'warning',
    danger = 'danger'
}

export enum ButtonAction {
    submit = 'submit',
    saveItem = 'saveItem',
    editItem = 'editItem',
    removeItem = 'removeItem',
    resetItem = 'resetItem'
}

export class ButtonMember extends ModelElementBase<ButtonMember> implements DisableBehavior {

    constructor(elementType: ModelElementType, buttonAction: ButtonAction | string, buttonClass: ButtonClass, text: FormText, disableWhenInvalid: boolean = false) {
        super(elementType);

        this.buttonAction = buttonAction;
        this.buttonClass = buttonClass;
        this.text = text;
        this.disableWhenInvalid = disableWhenInvalid;
    }

    public buttonAction: ButtonAction | string;
    public buttonClass: ButtonClass;
    public text: FormText;
    public disableWhenInvalid: boolean;
    public customDisabledHandler: boolean;
    public helpers: ElementHelper[];

    public useCustomDisabledHandler(): ButtonMember {
        this.customDisabledHandler = true;
        return this;
    }

}