import { Component, Inject, Injector, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ELEMENT_DATA, ElementData } from '../elements/element.data';
import { ViewContainerAccessor, VIEW_CONTAINER_ACCESSOR } from '../view.container.accessor';
import { ListFieldEntryEditableComponent } from './list.field.entry.editable.component';

@Component({
    selector: '[list-field-entry-display]',
    templateUrl: './list.field.entry.display.pug',
    providers: [
        { provide: VIEW_CONTAINER_ACCESSOR, useExisting: ListFieldEntryDisplayComponent }
    ]
})
export class ListFieldEntryDisplayComponent extends ListFieldEntryEditableComponent implements ViewContainerAccessor {

    @Input() form: FormGroup;

    constructor(
        @Inject(ELEMENT_DATA) elementData: ElementData,
        injector: Injector
    ) {
        super(
            elementData,
            injector
        );
    }

}