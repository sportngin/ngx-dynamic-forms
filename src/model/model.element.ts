import { InjectionToken } from '@angular/core';

import { ElementType }      from '../element.type';
import { ControlPosition }  from './control.position';

export interface ModelElementRenderCondition {
    key: string;
    method?: string;
    required?: boolean
}

export interface RenderOnParent {
    cssClasses?: string[];
}

export interface ElementHelper {
    text: string;
    cssClasses?: string[];
    position?: ControlPosition;
    renderConditions?: ModelElementRenderCondition[];
    renderOnParent?: RenderOnParent[];
}

export const ELEMENT_HELPER = new InjectionToken<ElementHelper>('ELEMENT_HELPER');

/**
 * The simplest representation of a piece of a model
 */
export interface ModelElement {
    /** the type of element */
    elementType: ElementType;
    /** the CSS class to render on the element */
    cssClasses: string[];
    /** an optional array of helpers to be rendered for the element */
    helpers?: ElementHelper[];
    /** an optional array of conditions to help determine whether the element should be rendered */
    renderConditions?: ModelElementRenderCondition[];
    /** determines whether the element is rendered as disabled */
    disabled: boolean;
    /** determines whether the control created by this element will display validation styling **/
    displaysValidation: boolean;
    /** optionally defines actions to perform on the parent element when it is rendered **/
    renderOnParent?: RenderOnParent[];

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
    addHelper: (text: string, cssClass?: string, position?: ControlPosition, renderConditions?: ModelElementRenderCondition[], renderOnParent?: RenderOnParent[]) => T;

    addData: (key: string, value: any) => T;

    /**
     * Sets the `disabled` property to true
     */
    disable(): T;
}