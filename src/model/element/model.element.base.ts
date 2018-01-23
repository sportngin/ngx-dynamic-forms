import { getCssClassArray }             from '../css.helper';
import { ElementType }                  from './element.type';
import { ModelElementBuilder }          from './model.element.builder';
import { ModelElementRenderCondition }  from './model.element.render.condition';

/**
 * Provides a base implementation of {@link ModelElement} and {@link ModelElementBuilder}.
 */
export class ModelElementBase<TSelf extends ModelElementBase<TSelf>> implements ModelElementBuilder<TSelf> {

    constructor(public readonly elementType: ElementType, parentOptionsConfigKeys: string[], optionsConfigKeys: string[]) {
        this.optionsConfigKeys = ['element', ...parentOptionsConfigKeys || [], elementType, ...optionsConfigKeys || []];
    }

    protected get self(): TSelf {
        return this as any as TSelf;
    }

    public cssClasses: string[];
    public readonly optionsConfigKeys: string[];
    public renderConditions: ModelElementRenderCondition[];

    public addCssClass(...cssClasses: string[]): TSelf {
        cssClasses = getCssClassArray(...cssClasses);
        if (!this.cssClasses) {
            this.cssClasses = cssClasses;
        } else {
            this.cssClasses.push(...cssClasses);
        }
        return this.self;
    }

    public addConditions(...renderConditions: ModelElementRenderCondition[]): TSelf {
        if (!this.renderConditions) {
            this.renderConditions = renderConditions;
        } else {
            this.renderConditions.push(...renderConditions);
        }

        return this.self;
    }

    public addListItemControlConditions(...renderConditions: ModelElementRenderCondition[]): TSelf {
        return this.addConditions(...renderConditions.map(condition => Object.assign(condition, { method: 'isListItemControlRendered' })));
    }

}