import { FormText }                         from '../../form.text';
import { ElementHelper, ModelElementType }  from '../model.element';
import { ModelElementBase }                 from '../model.element.base';

export type ButtonClass = 'primary' | 'secondary' | 'default' | 'success' | 'warning' | 'danger';

export const BUTTON_CLASSES = {
    primary: 'primary' as ButtonClass,
    secondary: 'secondary' as ButtonClass,
    default: 'default' as ButtonClass,
    success: 'success' as ButtonClass,
    warning: 'warning' as ButtonClass,
    danger: 'danger' as ButtonClass
};

export type ButtonAction = 'submit' | 'saveItem' | 'editItem' | 'removeItem' | 'resetItem' | string;

export const ButtonActions = {
    submit: 'submit' as ButtonAction,
    saveItem: 'saveItem' as ButtonAction,
    editItem: 'editItem' as ButtonAction,
    removeItem: 'removeItem' as ButtonAction,
    resetItem: 'resetItem' as ButtonAction
};

export class ButtonMember extends ModelElementBase {

    constructor(elementType: ModelElementType, buttonAction: ButtonAction, buttonClass: ButtonClass, text: FormText, disableWhenInvalid: boolean = false) {
        super(elementType);

        this.buttonAction = buttonAction;
        this.buttonClass = buttonClass;
        this.text = text;
        this.disableWhenInvalid = disableWhenInvalid;
    }

    public buttonAction: ButtonAction;
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