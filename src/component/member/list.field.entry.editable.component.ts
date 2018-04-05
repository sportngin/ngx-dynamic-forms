import { Injector, ViewChild, ViewContainerRef, Input, Component } from '@angular/core';

import { ArrayMember }          from '../../model/member';
import { ElementData }          from '../element.data';
import { ElementRenderMode }    from '../element.render.mode';
import { TEMPLATE }             from '../parent.component';
import { StructuralComponent }  from '../structural.component';
import { EntryState }           from './list.field.component';

@Component({
    selector: '[list-field-editable]',
    template: TEMPLATE
})
export class ListFieldEntryEditableComponent extends StructuralComponent<ArrayMember> {

    @ViewChild('container', { read: ViewContainerRef }) public container: ViewContainerRef;

    @Input() public entryState: EntryState;
    @Input() public set renderMode(renderMode: ElementRenderMode) {
        this.elementData.renderMode = renderMode;
    }
    public get renderMode(): ElementRenderMode {
        return this.elementData.renderMode;
    }

    constructor(
        elementData: ElementData,
        injector: Injector
    ) {
        super(
            Object.assign({}, elementData), // must clone or it will be reused between this and the other editable
            (elementData.element as ArrayMember).template.toElements(),
            injector
        );
    }

}