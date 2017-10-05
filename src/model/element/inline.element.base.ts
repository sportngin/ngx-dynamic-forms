import { getCssClassArray } from '../css.helper';
import { ElementType }      from './element.type';
import { InlineElement }    from './inline.element';
import { ModelElementBase } from './model.element.base';

export class InlineElementBase<TSelf extends InlineElementBase<TSelf>> extends ModelElementBase<TSelf> implements InlineElement {

    public text: string;

    constructor(cssClass?: string, text?: string, optionsConfigKeys?: string[]) {
        super(ElementType.inline, null, optionsConfigKeys);
        if (cssClass) {
            this.cssClasses = getCssClassArray(cssClass);
        }
        this.text = text;
    }

}