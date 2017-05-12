import {
    ElementHelper, ModelElementBuilder, ModelElementRenderCondition,
    ModelElementType
} from './model.element';
import { ControlPosition, ControlPositions } from './control.position';

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

    public addCssClass(...cssClass: string[]): ModelElementBuilder {
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
            cssClass = cssClass.replace(/\./g, ' ').trim();
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