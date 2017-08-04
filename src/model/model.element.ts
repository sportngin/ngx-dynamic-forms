import { ControlPosition } from './control.position';

/**
 * Contains an enumeration of valid ModelElementType values;
 */
export enum ModelElementType {
    array = 'array',
    button = 'button',
    control = 'control',
    group = 'group',
    layout = 'layout',
    page = 'page',
    pageRoot = 'pageRoot',
    submit = 'submit',
    validator = 'validator'
}

export interface ModelElementRenderCondition {
    key: string;
    method?: string;
    required?: boolean
}

export interface ElementHelper {
    text: string;
    cssClass?: string;
    position?: ControlPosition;
}

/**
 * The simplest representation of a piece of a model
 */
export interface ModelElement {
    /** the type of element */
    elementType: ModelElementType;
    /** the CSS class to render on the element */
    cssClass: string;
    /** an optional array of helpers to be rendered for the element */
    helpers?: ElementHelper[];
    /** an optional array of conditions to help determine whether the element should be rendered */
    renderConditions?: ModelElementRenderCondition[];
    /** determines whether the element is rendered as disabled */
    disabled: boolean;
    /** determines whether the control created by this element will display validation styling **/
    displaysValidation: boolean;

    data: { [key: string]: any };
}

/**
 * Extends {@link ModelElement} to define a fluent interface for configuring elements
 * @see {ModelElement}
 */
export interface ModelElementBuilder<T extends ModelElementBuilder<T>> extends ModelElement {

    /**
     * Adds one or more render conditions to determine whether the element should be rendered
     * @param {ModelElementRenderCondition | ModelElementRenderCondition[]} conditions
     */
    addConditions: (...conditions: ModelElementRenderCondition[]) => T;

    /**
     * Adds one or more CSS classes to be rendered for the element
     * @param {string | string[]} cssClass
     */
    addCssClass: (...cssClass: string[]) => T;

    /**
     * Adds a helper to be rendered for the element
     * @param text
     * @param cssClass
     * @param position
     */
    addHelper: (text: string, cssClass?: string, position?: ControlPosition) => T;

    addData: (key: string, value: any) => T;

    /**
     * Sets the `disabled` property to true
     */
    disable(): T;
}