import { RenderOnParent }               from '../render.on.parent';
import { ElementType }                  from './element.type';
import { ModelElementRenderCondition }  from './model.element.render.condition';

/**
 * The simplest representation of a piece of a model
 */
export interface ModelElement {
    /** the type of element */
    elementType: ElementType;
    /** key used to retrieve default options from the configuration **/
    optionsConfigKeys: string[];
    /** the CSS class to render on the element */
    cssClasses: string[];
    /** an optional array of conditions to help determine whether the element should be rendered */
    renderConditions?: ModelElementRenderCondition[];
    /** optionally defines actions to perform on the parent element when it is rendered **/
    renderOnParent?: RenderOnParent[];
}