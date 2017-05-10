import { ModelElementBase }                 from '../model.element.base';
import { ElementHelper, ModelElementType }  from '../model.element';

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

    constructor(elementType: ModelElementType, buttonAction: ButtonAction, buttonClass: ButtonClass, text: string, altText?: string, disableWhenInvalid: boolean = false) {
        super(elementType);

        this.buttonAction = buttonAction;
        this.buttonClass = buttonClass;
        this.text = text;
        this.altText = altText;
        this.disableWhenInvalid = disableWhenInvalid;
    }

    public buttonAction: ButtonAction;
    public buttonClass: ButtonClass;
    public text: string;
    public altText: string;
    public disableWhenInvalid: boolean;
    public customDisabledHandler: boolean;
    public helpers: ElementHelper[];

    public useCustomDisabledHandler(): ButtonMember {
        this.customDisabledHandler = true;
        return this;
    }

}