import { FormGroup }    from '@angular/forms';

import { ModelElement }         from '../model/element';
import { ElementRenderMode }    from './element.render.mode';

export class ElementData<TElement = ModelElement> {
    form: FormGroup;
    element: TElement;
    renderMode?: ElementRenderMode;
    createsSiblings?: boolean = true;
}