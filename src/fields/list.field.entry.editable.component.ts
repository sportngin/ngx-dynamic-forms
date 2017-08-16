import { Injector, ViewChild, ViewContainerRef, Input } from '@angular/core';

import { HostedElement } from '../hosted.element';
import { ElementData } from '../elements/element.data';
import { EntryState } from './list.field.component';
import { ModelControl } from "../model/control/model.control";

export abstract class ListFieldEntryEditableComponent extends HostedElement {

    @ViewChild('container', { read: ViewContainerRef }) public container: ViewContainerRef;
    @Input() entryState: EntryState;
    @Input() childControls: ModelControl[];

    constructor(
        elementData: ElementData,
        injector: Injector
    ) {
        super(
            elementData,
            injector
        );
    }

}