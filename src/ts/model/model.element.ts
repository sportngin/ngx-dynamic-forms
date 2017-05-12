import { ControlPosition } from './control.position';

export type ModelElementType = 'array' | 'button' | 'control' | 'group' | 'layout' | 'page' | 'submit';

/**
 * Contains an enumeration of valid ModelElementType values;
 */
export const ModelElementTypes = {
    array: 'array' as ModelElementType,
    button: 'button' as ModelElementType,
    control: 'control' as ModelElementType,
    group: 'group' as ModelElementType,
    layout: 'layout' as ModelElementType,
    page: 'page' as ModelElementType,
    submit: 'submit' as ModelElementType
};

export interface ModelElementRenderCondition {
    key: string;
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
}

/**
 * Extends {@link ModelElement} to define a fluent interface for configuring elements
 * @see {ModelElement}
 */
export interface ModelElementBuilder extends ModelElement {

    /**
     * Adds one or more render conditions to determine whether the element should be rendered
     * @param {ModelElementRenderCondition | ModelElementRenderCondition[]} conditions
     */
    addConditions: (...conditions: ModelElementRenderCondition[]) => ModelElementBuilder;

    /**
     * Adds one or more CSS classes to be rendered for the element
     * @param {string | string[]} cssClass
     */
    addCssClass: (...cssClass: string[]) => ModelElementBuilder;

    /**
     * Adds a helper to be rendered for the element
     * @param text
     * @param cssClass
     * @param position
     */
    addHelper: (text: string, cssClass?: string, position?: ControlPosition) => ModelElementBuilder;

    /**
     * Sets the `disabled` property to true
     */
    disable(): ModelElementBuilder;
}