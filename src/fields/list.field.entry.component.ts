import { Component, EventEmitter, Inject, Injector, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ELEMENT_DATA, ElementData }    from '../elements/element.data';
import { HostedElement }                from '../hosted.element';
import { ModelControl }                 from '../model/control/model.control';
import { EntryState }                   from './list.field.component';

@Component({
    selector: 'li [list-field-entry]',
    templateUrl: './list.field.entry.component.pug'
})
export class ListFieldEntryComponent extends HostedElement {

    @Input() form: FormGroup;
    @Input() entryState: EntryState;
    @Input() childControls: ModelControl[];

    @Output() editEntry: EventEmitter<void> = new EventEmitter<void>();

    constructor(
        @Inject(ELEMENT_DATA) elementData: ElementData,
        injector: Injector
    ) {
        super(
            elementData,
            injector
        );
    }

    public onEditEntry(): void {
        this.editEntry.next();
    }

}