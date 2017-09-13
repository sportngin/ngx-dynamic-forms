import { ElementPosition }      from '../element.position';
import { ElementTipAlignment }  from '../element.tip.alignment';
import { RenderOnParent }       from '../render.on.parent';
import { ToolTipPosition }      from '../tool.tip.position';
import { ModelElement }         from './model.element';
import { ModelElementRenderCondition } from './model.element.render.condition';

/**
 * Extends {@link ModelElement} to define a fluent interface for configuring elements
 * @see {ModelElement}
 */
export interface ModelElementBuilder<T extends ModelElementBuilder<T>> extends ModelElement {

    /**
     * Adds one or more render conditions to determine whether the element should be rendered
     */
    addConditions: (...conditions: ModelElementRenderCondition[]) => T;

    /**
     * Adds one or more CSS classes to be rendered for the element
     */
    addCssClass: (...cssClass: string[]) => T;

    /**
     * Adds a tooltip to be rendered for the element
     */
    addToolTip: (
        text: string,
        cssClass?: string,
        position?: ToolTipPosition,
        alignment?: ElementTipAlignment,
        renderConditions?: ModelElementRenderCondition[],
        renderOnParent?: RenderOnParent[]
    ) => T;

    /**
     * Adds a sibling tip to be rendered for the element
     */
    addSiblingTip: (
        text: string,
        cssClass?: string,
        position?: ElementPosition,
        alignment?: ElementTipAlignment,
        renderConditions?: ModelElementRenderCondition[],
        renderOnParent?: RenderOnParent[]
    ) => T;

    /**
     * Adds arbitrary data to help with the rendering or validation of the element
     */
    addData: (key: string, value: any) => T;

    /**
     * Sets the `disabled` property to true
     */
    disable(): T;
}