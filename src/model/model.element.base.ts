import { extend, map } from 'lodash';

import { ControlPosition } from './control.position';
import { cleanCssClass, getCssClassArray, getCssClassFromArray } from './css.helper';
import { ElementHelper, ModelElementBuilder, ModelElementRenderCondition, ModelElementType } from './model.element';

/**
 * Provides a base implementation of {@link ModelElement} and {@link ModelElementBuilder}.
 */
export class ModelElementBase<T extends ModelElementBase<T>> implements ModelElementBuilder<T> {

    /**
     *
     * @param {ModelElementType} elementType
     */
    constructor(elementType: ModelElementType) {
        this.elementType = elementType;
    }

    protected get self(): T {
        return this as any as T;
    }

    private cssClasses: string[];
    public get cssClass(): string {
        return getCssClassFromArray(this.cssClasses);
    }

    public readonly elementType: ModelElementType;
    public helpers: ElementHelper[];
    public renderConditions: ModelElementRenderCondition[];
    public disabled: boolean;
    public displaysValidation: boolean = true;
    public data: { [key: string]: any };

    public addCssClass(...cssClass: string[]): T {
        cssClass = getCssClassArray(...cssClass);
        if (!this.cssClasses) {
            this.cssClasses = cssClass;
        } else {
            this.cssClasses.push(...cssClass);
        }
        return this.self;
    }

    public addHelper(text: string, cssClass?: string, position: ControlPosition = ControlPosition   .after): T {
        if (!this.helpers) {
            this.helpers = [];
        }
        if (cssClass) {
            cssClass = cleanCssClass(cssClass);
        }
        this.helpers.push({ text, cssClass, position });

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