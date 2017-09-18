import { getCssClassArray }             from '../css.helper';
import { ElementSiblingPosition }       from '../element.sibling.position';
import { ElementTipAlignment }          from '../element.tip.alignment';
import { RenderOnParent }               from '../render.on.parent';
import { ElementAbsolutePosition }      from '../element.absolute.position';
import { ModelElementSiblingPosition }  from './element.tip.options';
import { ElementType }                  from './element.type';
import { InlineElementSiblingBase }     from './inline.element.sibling.base';
import { ModelControlBuilder }          from './model.control.builder';
import { ModelElementBase }             from './model.element.base';
import { ModelElementRenderCondition }  from './model.element.render.condition';
import { ModelElementSibling }          from './model.element.sibling';
import { ModelElementTipType }          from './model.element.tip.type';


export class ModelControlBase<TSelf extends ModelControlBase<TSelf>> extends ModelElementBase<TSelf> implements ModelControlBuilder<TSelf> {

    constructor(elementType: ElementType, parentOptionsConfigKeys?: string[], optionsConfigKeys?: string[]) {
        super(elementType, ['control', ...parentOptionsConfigKeys || []], optionsConfigKeys);
    }
    public disabled: boolean;
    public data: { [key: string]: any };
    public siblings: ModelElementSibling[];

    public addInlineSibling(position: ElementSiblingPosition, cssClass?: string, text?: string): TSelf {
        return this.addSibling(new InlineElementSiblingBase(position, cssClass, text));
    }

    public addSibling<TSibling extends ModelElementSibling>(...sibling: TSibling[]): TSelf {
        if (!this.siblings) {
            this.siblings = [];
        }
        this.siblings.push(...sibling);
        return this.self;
    }

    public addTip(
        tipType: ModelElementTipType,
        optionsConfigKeys: string[],
        text: string,
        cssClass: string,
        position: ModelElementSiblingPosition,
        alignment: ElementTipAlignment,
        renderConditions: ModelElementRenderCondition[],
        renderOnParent: RenderOnParent[]): TSelf {

        let cssClasses = [];
        if (cssClass) {
            cssClasses = getCssClassArray(cssClass);
        }

        return this.addSibling({
            elementType: ElementType.tip,
            optionsConfigKeys,
            tipType,
            text,
            cssClasses,
            position,
            alignment,
            renderConditions,
            renderOnParent
        });
    }

    public addSiblingTip(
        text: string,
        cssClass?: string,
        position: ElementSiblingPosition = ElementSiblingPosition.after,
        alignment: ElementTipAlignment = ElementTipAlignment.left,
        renderConditions?: ModelElementRenderCondition[],
        renderOnParent?: RenderOnParent[]): TSelf {
        return this.addTip(ModelElementTipType.sibling, [ModelElementTipType.sibling], text, cssClass, position, alignment, renderConditions, renderOnParent);
    }

    public addToolTip(
        text: string,
        cssClass?: string,
        position: ElementAbsolutePosition = ElementAbsolutePosition.top,
        alignment: ElementTipAlignment = ElementTipAlignment.left,
        renderConditions?: ModelElementRenderCondition[],
        renderOnParent?: RenderOnParent[]): TSelf {
        return this.addTip(ModelElementTipType.tooltip, [ModelElementTipType.tooltip], text, cssClass, position, alignment, renderConditions, renderOnParent);
    }

    public addData(key: string, value: any): TSelf {
        if (!this.data) {
            this.data = {};
        }
        this.data[key] = value;
        return this.self;
    }

    public disable(): TSelf {
        this.disabled = true;
        return this.self;
    }

}