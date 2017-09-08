import {
    Component, EventEmitter, Injector, OnDestroy, Output, TemplateRef, ViewChild, ViewContainerRef, DoCheck, Inject,
    OnInit
} from '@angular/core';

import { ElementData }      from '../elements/element.data';
import { HostedElement }    from '../hosted.element';
import { ArrayControl }     from '../model/control/array.control';
import { ButtonAction }     from '../model/member/button.member';
import { ListEntryData }    from './list.field.component';

@Component({
    selector: 'li [list-field-entry]',
    templateUrl: './list.field.entry.component.pug'
})
export class ListFieldEntryComponent extends HostedElement<ArrayControl> implements OnInit, DoCheck, OnDestroy {

    @ViewChild('display', { read: TemplateRef }) displayTemplate: TemplateRef<any>;
    @ViewChild('editor', { read: TemplateRef }) editorTemplate: TemplateRef<any>;
    @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;

    private isEditing: boolean;

    @Output() editEntry: EventEmitter<void> = new EventEmitter<void>();

    constructor(
        @Inject(ElementData) public elementData: ListEntryData,
        injector: Injector
    ) {
        super(elementData, injector);
    }

    private renderView(): void {
        this.container.clear();
        if (this.elementData.entryState.editing) {
            this.container.createEmbeddedView(this.editorTemplate);
        } else {
            this.container.createEmbeddedView(this.displayTemplate);
        }
        this.isEditing = this.elementData.entryState.editing;
    }

    public onEditEntry(): void {
        this.editEntry.next();
    }

    public saveItem(): void {
        this.handleBehavior(ButtonAction.saveItem, this.form);
    }

    private check(): void {
        if (this.isEditing !== this.elementData.entryState.editing) {
            this.renderView();
            if (this.isEditing) {
                this.addCssClass('ngdf-list-editing');
            } else {
                this.removeCssClass('ngdf-list-editing');
            }
        }
    }

    ngOnInit(): void {
        this.addCssClass(this.control.itemCssClass);
    }

    ngDoCheck(): void {
        this.check();
    }

    ngOnDestroy(): void {
        this.editEntry.complete();
    }

}