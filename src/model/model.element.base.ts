import { extend, map } from 'lodash';

import { ControlPosition } from './control.position';
import { cleanCssClass, getCssClassArray, getCssClassFromArray } from './css.helper';
import { ElementHelper, ModelElementBuilder, ModelElementRenderCondition, RenderOnParent } from './model.element';
import { ElementType } from '../element.type';

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
    public helpers: ElementHelper[];
    public renderConditions: ModelElementRenderCondition[];
    public disabled: boolean;
    public displaysValidation: boolean = true;
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

    public addHelper(text: string, cssClass?: string, position: ControlPosition = ControlPosition.after, renderConditions?: ModelElementRenderCondition[], renderOnParent?: RenderOnParent[]): T {
        if (!this.helpers) {
            this.helpers = [];
        }
        let cssClasses = [];
        if (cssClass) {
            cssClasses = getCssClassArray(cssClass);
        }
        this.helpers.push({ text, cssClasses, position, renderConditions, renderOnParent });

        return this.self;
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