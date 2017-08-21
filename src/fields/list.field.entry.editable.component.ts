import { Injector, ViewChild, ViewContainerRef, Input, Component, Inject } from '@angular/core';

import { ELEMENT_DATA, ElementData } from '../elements/element.data';
import { StructuralComponent } from '../structural.component';
import { TEMPLATE } from '../parent.component';
import { EntryState } from './list.field.component';

@Component({
    selector: '[list-field-editable]',
    template: TEMPLATE
})
export class ListFieldEntryEditableComponent extends StructuralComponent {

    @ViewChild('container', { read: ViewContainerRef }) public container: ViewContainerRef;

    @Input() entryState: EntryState;
    @Input() set displayOnly(displayOnly: boolean) {
        this.elementData.displayOnly = displayOnly;
    }

    constructor(
        @Inject(ELEMENT_DATA) elementData: ElementData,
        injector: Injector
    ) {
        super(
            elementData,
            elementData.control.childControls,
            injector
        );

        console.log('ListFieldEntryEditableComponent.ctr', elementData);
    }

}