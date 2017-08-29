import {
    Injector, ViewChild, ViewContainerRef, Input, Component, Inject
} from '@angular/core';

import { extend } from 'lodash';

import { ElementData }    from '../elements/element.data';
import { TEMPLATE }                     from '../parent.component';
import { StructuralComponent }          from '../structural.component';
import { EntryState }                   from './list.field.component';

@Component({
    selector: '[list-field-editable]',
    template: TEMPLATE
})
export class ListFieldEntryEditableComponent extends StructuralComponent {

    @ViewChild('container', { read: ViewContainerRef }) public container: ViewContainerRef;

    @Input() public entryState: EntryState;
    @Input() public set displayOnly(displayOnly: boolean) {
        this.elementData.displayOnly = displayOnly;
    }
    public get displayOnly(): boolean {
        return this.elementData.displayOnly;
    }

    constructor(
        elementData: ElementData,
        injector: Injector
    ) {
        super(
            extend({}, elementData), // must clone or it will be reused between this and the other editable
            elementData.control.childControls,
            injector
        );
    }

}