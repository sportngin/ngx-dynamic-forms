import { getCssClassArray }             from '../css.helper';
import { ElementPosition }              from '../element.position';
import { ElementTipAlignment }          from '../element.tip.alignment';
import { RenderOnParent }               from '../render.on.parent';
import { ToolTipPosition }              from '../tool.tip.position';
import { ElementType }                  from './element.type';
import { ModelControlBuilder }          from './model.control.builder';
import { ModelElementBase }             from './model.element.base';
import { ModelElementRenderCondition }  from './model.element.render.condition';
import { ModelElementTip }              from './model.element.tip';
import { ModelElementTipType }          from './model.element.tip.type';


export class ModelControlBase<T extends ModelControlBase<T>> extends ModelElementBase<T> implements ModelControlBuilder<T> {

    constructor(elementType: ElementType, parentOptionsConfigKeys?: string[], optionsConfigKeys?: string[]) {
        super(elementType, ['control', ...parentOptionsConfigKeys || []], optionsConfigKeys);
    }
    public disabled: boolean;
    public data: { [key: string]: any };
    public tips: ModelElementTip[];

    public addTip(tipType: ModelElementTipType, optionsConfigKeys: string[], text: string, cssClass: string, position: ElementPosition | ToolTipPosition, alignment: ElementTipAlignment, renderConditions: ModelElementRenderCondition[], renderOnParent: RenderOnParent[]): T {
        if (!this.tips) {
            this.tips = [];
        }
        let cssClasses = [];
        if (cssClass) {
            cssClasses = getCssClassArray(cssClass);
        }
        this.tips.push({ elementType: ElementType.tip, optionsConfigKeys, tipType, text, cssClasses, position, alignment, renderConditions, renderOnParent });

        return this.self;
    }

    public addSiblingTip(
        text: string,
        cssClass?: string,
        position: ElementPosition = ElementPosition.after,
        alignment: ElementTipAlignment = ElementTipAlignment.left,
        renderConditions?: ModelElementRenderCondition[],
        renderOnParent?: RenderOnParent[]): T {
        return this.addTip(ModelElementTipType.sibling, [ModelElementTipType.sibling], text, cssClass, position, alignment, renderConditions, renderOnParent);
    }

    public addToolTip(
        text: string,
        cssClass?: string,
        position: ToolTipPosition = ToolTipPosition.top,
        alignment: ElementTipAlignment = ElementTipAlignment.left,
        renderConditions?: ModelElementRenderCondition[],
        renderOnParent?: RenderOnParent[]): T {
        return this.addTip(ModelElementTipType.tooltip, [ModelElementTipType.tooltip], text, cssClass, position, alignment, renderConditions, renderOnParent);
    }

    public addData(key: string, value: any): T {
        if (!this.data) {
            this.data = {};
        }
        this.data[key] = value;
        return this.self;
    }

    public disable(): T {
        this.disabled = true;
        return this.self;
    }

}