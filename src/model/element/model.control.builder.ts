import { ElementSiblingPosition }       from '../element.sibling.position';
import { ElementTipAlignment }          from '../element.tip.alignment';
import { RenderOnParent }               from '../render.on.parent';
import { ElementAbsolutePosition }      from '../element.absolute.position';
import { ModelElementSiblingPosition }  from './element.tip.options';
import { ModelControl }                 from './model.control';
import { ModelElementBuilder }          from './model.element.builder';
import { ModelElementRenderCondition }  from './model.element.render.condition';
import { ModelElementTipType }          from './model.element.tip.type';
import { ModelElementSibling }          from './model.element.sibling';

export interface ModelControlBuilder<TSelf extends ModelControlBuilder<TSelf>> extends ModelElementBuilder<TSelf>, ModelControl {

    addSibling(...sibling: ModelElementSibling[]): TSelf;

    addInlineSibling(position: ElementSiblingPosition, cssClass?: string, text?: string): TSelf;

    /**
     * Adds a tip to be rendered for the element
     */
    addTip(
        tipType: ModelElementTipType,
        optionsConfigKeys: string[],
        text: string,
        cssClass: string,
        position: ModelElementSiblingPosition,
        alignment: ElementTipAlignment,
        renderConditions: ModelElementRenderCondition[],
        renderOnParent: RenderOnParent[]
    ): TSelf;

    /**
     * Adds a tooltip to be rendered for the element
     */
    addToolTip: (
        text: string,
        cssClass?: string,
        position?: ElementAbsolutePosition,
        alignment?: ElementTipAlignment,
        renderConditions?: ModelElementRenderCondition[],
        renderOnParent?: RenderOnParent[]
    ) => TSelf;

    /**
     * Adds a sibling tip to be rendered for the element
     */
    addSiblingTip: (
        text: string,
        cssClass?: string,
        position?: ElementSiblingPosition,
        alignment?: ElementTipAlignment,
        renderConditions?: ModelElementRenderCondition[],
        renderOnParent?: RenderOnParent[]
    ) => TSelf;

    /**
     * Adds arbitrary data to help with the rendering or validation of the element
     */
    addData: (key: string, value: any) => TSelf;

    /**
     * Sets the `disabled` property to true
     */
    disable(): TSelf;

}