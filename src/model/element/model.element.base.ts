import { extend, map } from 'lodash';

import { getCssClassArray }             from '../css.helper';
import { ElementType }                  from './element.type';
import { ModelElementBuilder }          from './model.element.builder';
import { ModelElementRenderCondition }  from './model.element.render.condition';

/**
 * Provides a base implementation of {@link ModelElement} and {@link ModelElementBuilder}.
 */
export class ModelElementBase<T extends ModelElementBase<T>> implements ModelElementBuilder<T> {

    constructor(public readonly elementType: ElementType, parentOptionsConfigKeys: string[],  optionsConfigKeys: string[]) {
        this.optionsConfigKeys = ['element', ...parentOptionsConfigKeys || [], elementType, ...optionsConfigKeys || []];
    }

    protected get self(): T {
        return this as any as T;
    }

    public cssClasses: string[];
    public readonly optionsConfigKeys: string[];
    public renderConditions: ModelElementRenderCondition[];

    public addCssClass(...cssClasses: string[]): T {
        cssClasses = getCssClassArray(...cssClasses);
        if (!this.cssClasses) {
            this.cssClasses = cssClasses;
        } else {
            this.cssClasses.push(...cssClasses);
        }
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

}