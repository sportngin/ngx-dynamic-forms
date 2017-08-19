import { Component, Inject, Injector, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ELEMENT_DATA, ElementData }        from '../elements/element.data';
// import { VIEW_CONTAINER_ACCESSOR, ViewContainerAccessor } from '../view.container.accessor';
import { ListFieldEntryEditableComponent }  from './list.field.entry.editable.component';

@Component({
    selector: '[list-field-entry-editor]',
    templateUrl: './list.field.entry.editor.component.pug',
    // providers: [
    //     { provide: VIEW_CONTAINER_ACCESSOR, useExisting: ListFieldEntryEditorComponent }
    // ]
})
export class ListFieldEntryEditorComponent extends ListFieldEntryEditableComponent /*implements ViewContainerAccessor*/ {

    @Input() form: FormGroup;

    constructor(
        @Inject(ELEMENT_DATA) elementData: ElementData,
        injector: Injector
    ) {
        super(elementData, injector);
    }

}