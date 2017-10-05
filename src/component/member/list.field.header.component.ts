import { Injector, ViewChild, ViewContainerRef, Component } from '@angular/core';

import { ArrayMember }          from '../../model/member';
import { ElementData }          from '../element.data';
import { ElementRenderMode }    from '../element.render.mode';
import { TEMPLATE }             from '../parent.component';
import { StructuralComponent }  from '../structural.component';

@Component({
    selector: 'li [list-field-header]',
    template: TEMPLATE
})
export class ListFieldHeaderComponent extends StructuralComponent<ArrayMember> {

    @ViewChild('container', { read: ViewContainerRef }) public container: ViewContainerRef;

    constructor(
        elementData: ElementData,
        injector: Injector
    ) {
        super(
            elementData,
            (elementData.element as ArrayMember).template.toElements(),
            injector
        );
        this.elementData.renderMode = ElementRenderMode.labelOnly;
    }

}