import { ModelElement }                 from './model.element';
import { ModelElementRenderCondition }  from './model.element.render.condition';

/**
 * Extends {@link ModelElement} to define a fluent interface for configuring elements
 * @see {ModelElement}
 */
export interface ModelElementBuilder<TSelf extends ModelElementBuilder<TSelf>> extends ModelElement {

    /**
     * Adds one or more render conditions to determine whether the element should be rendered
     */
    addConditions: (...conditions: ModelElementRenderCondition[]) => TSelf;

    /**
     * Adds on or more render conditions to determine how the element is rendered within a list
     */
    addListItemControlConditions: (...renderConditions: ModelElementRenderCondition[]) => TSelf;

    /**
     * Adds one or more CSS classes to be rendered for the element
     */
    addCssClass: (...cssClass: string[]) => TSelf;

}