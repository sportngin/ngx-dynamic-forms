import { chain } from 'lodash';

import {
    ElementHelper, ModelElementBuilder, ModelElementRenderCondition,
    ModelElementType
} from './model.element';
import { ControlPosition, ControlPositions } from './control.position';

function cleanCssClass(cssClass) {
    return cssClass.replace(/\./g, ' ').trim();
}

/**
 * Provides a base implementation of {@link ModelElement} and {@link ModelElementBuilder}.
 */
export abstract class ModelElementBase implements ModelElementBuilder {

    /**
     *
     * @param {ModelElementType} elementType
     */
    constructor(elementType: ModelElementType) {
        this.elementType = elementType;
    }

    private cssClasses: string[];
    public get cssClass(): string {
        return this.cssClasses ? this.cssClasses.join(' ') : null;
    }

    public readonly elementType: ModelElementType;
    public helpers: ElementHelper[];
    public renderConditions: ModelElementRenderCondition[];
    public disabled: boolean;
    public displaysValidation: boolean = true;

    public addCssClass(...cssClass: string[]): ModelElementBuilder {
        cssClass = chain(cssClass)
            .map(entry => cleanCssClass(entry).split(' '))
            .flatten()
            .value() as string[];
        if (!this.cssClasses) {
            this.cssClasses = cssClass;
        } else {
            this.cssClasses.push(...cssClass);
        }
        return this;
    }

    public addHelper(text: string, cssClass?: string, position: ControlPosition = ControlPositions.after): ModelElementBuilder {
        if (!this.helpers) {
            this.helpers = [];
        }
        if (cssClass) {
            cssClass = cleanCssClass(cssClass);
        }
        this.helpers.push({ text, cssClass, position });
        return this;
    }

    public addConditions(...renderConditions: ModelElementRenderCondition[]): ModelElementBuilder {
        if (!this.renderConditions) {
            this.renderConditions = renderConditions;
        } else {
            this.renderConditions.push(...renderConditions);
        }

        return this;
    }

    public disable(): ModelElementBuilder {
        this.disabled = true;
        return this;
    }

}