import { ElementPosition }              from '../element.position';
import { ElementTipAlignment }          from '../element.tip.alignment';
import { RenderOnParent }               from '../render.on.parent';
import { ToolTipPosition }              from '../tool.tip.position';
import { ModelElementTipPosition }      from './element.tip.options';
import { ModelControl }                 from './model.control';
import { ModelElementBuilder }          from './model.element.builder';
import { ModelElementRenderCondition }  from './model.element.render.condition';
import { ModelElementTipType }          from './model.element.tip.type';

export interface ModelControlBuilder<T extends ModelControlBuilder<T>> extends ModelElementBuilder<T>, ModelControl {

    /**
     * Adds a tip to be rendered for the element
     */
    addTip(
        tipType: ModelElementTipType,
        optionsConfigKeys: string[],
        text: string,
        cssClass: string,
        position: ModelElementTipPosition,
        alignment: ElementTipAlignment,
        renderConditions: ModelElementRenderCondition[],
        renderOnParent: RenderOnParent[]
    ): T;

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