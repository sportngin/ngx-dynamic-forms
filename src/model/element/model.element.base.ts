import { extend, map } from 'lodash';
import { ModelElementBuilder } from './model.element.builder';
import { ElementType } from './element.type';
import { ModelElementTip } from './model.element.tip';
import { ModelElementRenderCondition } from './model.element.render.condition';
import { getCssClassArray } from '../css.helper';
import { ElementPosition } from '../element.position';
import { ToolTipPosition } from '../tool.tip.position';
import { RenderOnParent } from '../render.on.parent';
import { ModelElementTipType } from './model.element.tip.type';

/**
 * Provides a base implementation of {@link ModelElement} and {@link ModelElementBuilder}.
 */
export class ModelElementBase<T extends ModelElementBase<T>> implements ModelElementBuilder<T> {

    /**
     *
     * @param {ModelElementType} elementType
     */
    constructor(elementType: ElementType) {
        this.elementType = elementType;
    }

    protected get self(): T {
        return this as any as T;
    }

    public cssClasses: string[];

    public readonly elementType: ElementType;
    public tips: ModelElementTip[];
    public renderConditions: ModelElementRenderCondition[];
    public disabled: boolean;
    public data: { [key: string]: any };

    public addCssClass(...cssClasses: string[]): T {
        cssClasses = getCssClassArray(...cssClasses);
        if (!this.cssClasses) {
            this.cssClasses = cssClasses;
        } else {
            this.cssClasses.push(...cssClasses);
        }
        return this.self;
    }

    public addTip(tipType: ModelElementTipType, text: string, cssClass: string, position: ElementPosition | ToolTipPosition, renderConditions: ModelElementRenderCondition[], renderOnParent: RenderOnParent[]): T {
        if (!this.tips) {
            this.tips = [];
        }
        let cssClasses = [];
        if (cssClass) {
            cssClasses = getCssClassArray(cssClass);
        }
        this.tips.push({ elementType: ElementType.tip, tipType, text, cssClasses, position, renderConditions, renderOnParent });

        return this.self;
    }

    public addSiblingTip(text: string, cssClass?: string, position: ElementPosition = ElementPosition.after, renderConditions?: ModelElementRenderCondition[], renderOnParent?: RenderOnParent[]): T {
        return this.addTip(ModelElementTipType.sibling, text, cssClass, position, renderConditions, renderOnParent);
    }

    public addToolTip(text: string, cssClass?: string, position: ToolTipPosition = ToolTipPosition.top, renderConditions?: ModelElementRenderCondition[], renderOnParent?: RenderOnParent[]): T {
        return this.addTip(ModelElementTipType.tooltip, text, cssClass, position, renderConditions, renderOnParent);
    }

    public addConditions(...renderConditions: ModelElementRenderCondition[]): T {
        if (!this.renderConditions) {
            this.renderConditions = renderConditions;
        } else {
            this.renderConditions.push(...renderConditions);
        }

        return this.self;
    }

    public addListItemControlConditions(...renderConditions: ModelElementRenderCondition[]): T {
        return this.addConditions(...map(renderConditions, condition => extend(condition, { method: 'isListItemControlRendered' })));
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