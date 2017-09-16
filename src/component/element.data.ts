import { FormGroup }    from '@angular/forms';

import { ModelElement }         from '../model/element';
import { ElementRenderMode }    from './element.render.mode';

export class ElementData {
    form: FormGroup;
    element: ModelElement;
    renderMode?: ElementRenderMode;
    createsTips?: boolean = true;
}