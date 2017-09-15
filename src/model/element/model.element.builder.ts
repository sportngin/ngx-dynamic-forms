import { ElementPosition }              from '../element.position';
import { ElementTipAlignment }          from '../element.tip.alignment';
import { RenderOnParent }               from '../render.on.parent';
import { ToolTipPosition }              from '../tool.tip.position';
import { ModelElementTipPosition }      from './element.tip.options';
import { ModelElement }                 from './model.element';
import { ModelElementRenderCondition }  from './model.element.render.condition';
import { ModelElementTipType }          from './model.element.tip.type';

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
}