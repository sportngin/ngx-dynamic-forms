import { InlineElementBase }    from './inline.element.base';
import { InlineElementSibling } from './inline.element.sibling';
import { ElementSiblingPosition } from '../element.sibling.position';

export class InlineElementSiblingBase extends InlineElementBase<InlineElementSiblingBase> implements InlineElementSibling {

    public position: ElementSiblingPosition;

    constructor(position: ElementSiblingPosition, cssClass?: string, text?: string) {
        super(cssClass, text, ['inline-sibling']);

        this.position = position;
    }

}