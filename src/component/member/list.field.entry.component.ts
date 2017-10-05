import {
    Component, EventEmitter, Injector, OnDestroy, Output, TemplateRef, ViewChild, ViewContainerRef, DoCheck, Inject,
    OnInit
} from '@angular/core';

import { ButtonAction }         from '../../model/element';
import { ArrayMember }          from '../../model/member';
import { ElementData }          from '../element.data';
import { FormElementComponent } from '../form.element.component';
import { ListEntryData }        from './list.field.component';

@Component({
    selector: 'li [list-field-entry]',
    templateUrl: './list.field.entry.component.pug'
})
export class ListFieldEntryComponent extends FormElementComponent<ArrayMember> implements OnInit, DoCheck, OnDestroy {

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
        this.addCssClass(...this.element.itemCssClasses);
    }

    ngDoCheck(): void {
        this.check();
    }

    ngOnDestroy(): void {
        this.editEntry.complete();
    }

}