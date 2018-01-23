import {
    Component, Injector, OnInit, ViewChildren, QueryList, AfterViewInit, ViewEncapsulation, ViewContainerRef,
    ViewChild, AfterContentChecked
} from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';

import { each, flatten, last, omit } from 'lodash-es';

import { Model }                            from '../../model';
import { ModelElement, SIBLINGS_PROPERTY }  from '../../model/element';
import { ArrayMember, LABEL_DISPLAY_OPTIONS, ModelMember } from '../../model/member';

import {
    behaviorProvider, BehaviorType, EditItemHandler, IsListItemControlRenderedHandler, RemoveItemHandler,
    ResetItemHandler, SaveItemHandler
} from '../../behavior';

import { ComponentInfo }            from '../component.info';
import { ElementData }              from '../element.data';
import { FormMemberComponent }      from '../form.member.component';
import { MemberData }               from '../member.data';
import { ListFieldEntryComponent }  from './list.field.entry.component';
import { ListFieldEntryDirective }  from './list.field.entry.directive';
import { ListFieldHeaderComponent } from './list.field.header.component';

export interface EntryState {
    submitted: boolean,
    editing: boolean;
}

export interface ListEntryData extends MemberData {
    entryState: EntryState
}

@Component({
    selector: 'ul [list-field]',
    templateUrl: './list.field.component.pug',
    viewProviders: [
        behaviorProvider(ListFieldComponent, BehaviorType.editItem),
        behaviorProvider(ListFieldComponent, BehaviorType.isListItemControlRendered),
        behaviorProvider(ListFieldComponent, BehaviorType.removeItem),
        behaviorProvider(ListFieldComponent, BehaviorType.resetItem),
        behaviorProvider(ListFieldComponent, BehaviorType.saveItem)
    ],
    styleUrls: ['./list.field.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ListFieldComponent extends FormMemberComponent<ArrayMember, FormArray> implements
    OnInit, AfterViewInit, AfterContentChecked,
    EditItemHandler, SaveItemHandler, RemoveItemHandler, ResetItemHandler,
    IsListItemControlRenderedHandler {

    @ViewChild('container', { read: ViewContainerRef }) public container: ViewContainerRef;
    @ViewChild('headerContainer', { read: ViewContainerRef }) public headerContainer: ViewContainerRef;
    @ViewChildren(ListFieldEntryDirective) private inputs: QueryList<ListFieldEntryDirective>;

    public itemTemplate: Model;
    public entryState: EntryState[] = [];
    public get children(): ModelElement[] { return this.element ? this.element.template.toElements() : null; }

    private initialized: boolean = false;

    constructor(
        elementData: MemberData,
        private fb: FormBuilder,
        injector: Injector
    ) {
        super(elementData, injector);

        this.itemTemplate = elementData.template;
    }

    ngOnInit(): void {
        this.formControl.controls.forEach(() => {
            this.entryState.push({ submitted: false, editing: true });
        });

        this.addEmptyEntryIfNeeded();

        this.host.valueInjections.subscribe(injection => {
            if (injection.control !== this.formControl) {
                return;
            }
            let items = injection.value as any[];
            items.forEach((value, i) => this.setEntry(value, i));
            this.formControl.reset(items);
            this.addEmptyEntryIfNeeded();
        });
    }

    private createHeaderComponent(): ComponentInfo {
        let entryControl = omit(this.element, SIBLINGS_PROPERTY) as ModelMember;
        let elementData: MemberData = {
            element: entryControl,
            form: this.form,
            formControl: this.formControl,
            children: this.children as ModelElement[]
        };
        let providers = [
            { provide: ElementData, useValue: elementData }
        ];
        return this.controlManager.createComponent({
            container: this.headerContainer,
            elementData: this.elementData,
            isRendered: this.isRendered.bind(this),
            addRenderOnParent: this.addRenderOnParent.bind(this),
            removeRenderOnParent: this.removeRenderOnParent.bind(this)
        }, entryControl, ListFieldHeaderComponent, providers);
    }

    private createEntryComponent(entry: FormGroup, entryState: EntryState): ComponentInfo {
        let entryControl = omit(this.element, SIBLINGS_PROPERTY) as ModelMember;
        let entryData: ListEntryData = {
            form: entry,
            formControl: entry,
            entryState,
            element: entryControl,
            children: this.children as ModelElement[]
        };
        let providers = [
            { provide: ElementData, useValue: entryData },
            { provide: LABEL_DISPLAY_OPTIONS, useValue: this.element.itemLabelOptions }
        ];

        let entryComponent = this.controlManager.createComponent(this, entryControl, ListFieldEntryComponent, providers);
        let componentInstance: ListFieldEntryComponent = entryComponent.component.instance as ListFieldEntryComponent;
        componentInstance.editEntry.subscribe(() => this.editEntry(componentInstance.form));

        return entryComponent;
    }

    private createEntryComponents(entries: FormGroup[], startIndex: number = 0): ComponentInfo[] {
        let result = [];
        result.push(
            ...flatten(entries
                .map((entry, index) => this.createEntryComponent(entry as FormGroup, this.entryState[startIndex + index]))
            )
        );
        return result;
    }

    ngAfterContentChecked(): void {
        if (!this.initialized) {
            return;
        }
        if (this.formControl.controls.length > this.container.length) {
            this.controlManager.insertComponents(
                ...this.createEntryComponents(
                    this.formControl.controls.slice(this.container.length) as FormGroup[],
                    this.container.length
                )
            );
        }
    }

    createChildComponents(): ComponentInfo[] {
        let result = [];
        if (this.element.itemLabelOptions.headerRow) {
            result.push(this.createHeaderComponent());
        }
        result.push(...this.createEntryComponents(this.formControl.controls as FormGroup[]));
        return result;
    }

    ngAfterViewInit(): void {
        super.ngAfterViewInit();
        this.initialized = true;

        this.inputs.changes.subscribe((changes: QueryList<ListFieldEntryDirective>) => {
            if (changes.last && last(this.entryState).editing) {
                changes.last.focusFirstInput();
            }
        });
    }

    addEmptyEntryIfNeeded(): void {
        let lastEntry = last(this.entryState);
        if (this.element.canAddItem && (lastEntry.submitted || !lastEntry.editing)) {
            let form = this.itemTemplate.toFormGroup(this.fb);
            this.formControl.push(form);
            this.entryState.push({ submitted: false, editing: true });
        }
    }

    onSaveItemClick(form: AbstractControl): any {
        if (form.valid) {
            let index = this.formControl.controls.indexOf(form);

            this.entryState[index].submitted = true;
            this.entryState[index].editing = false;

            this.addEmptyEntryIfNeeded();
        }
        return false;
    }

    onRemoveItemClick(form: AbstractControl): void {
        let index = this.formControl.controls.indexOf(form);

        this.formControl.removeAt(index);
        this.entryState.splice(index, 1);
        this.container.remove(index);
    }

    onResetItemClick(form: AbstractControl): void {
        form.reset({});
    }

    setEntry(value: any, index: number): void {
        let form;
        if (index >= this.formControl.length) {
            form = this.itemTemplate.toFormGroup(this.fb);
            this.formControl.push(form);
            let state = { submitted: form.valid, editing: false};
            this.entryState.push(state);
            this.patchAndCheck(form, value, state);
        } else {
            form = this.formControl.controls[index];
            let state = { submitted: form.valid, editing: false };
            Object.assign(this.entryState[index], state);
            this.patchAndCheck(form, value, state);
        }
        if (!form.valid) {
            this.editEntry(form);
        }
    }

    private patchAndCheck(form: AbstractControl, value: any, state: any): void {
        form.patchValue(value);
        setTimeout(() => {
            this.checkDirty(form);
            Object.assign(state, { submitted: form.valid, editing: false });
            if (!form.valid) {
                this.editEntry(form);
            }
        });
    }

    private checkDirty(form: AbstractControl): void {
        if (form.value && form.errors) {
            form.markAsDirty();
            form.markAsTouched();
        } else if (form instanceof FormGroup) {
            let formGroup = form as FormGroup;
            each(formGroup.controls, (control) => {
                this.checkDirty(control);
            });
        }
    }

    get hasEntries(): boolean {
        return this.formControl.controls.length > 0 &&
                this.formControl.controls[0].valid &&
                this.entryState[0].submitted;
    }

    private get formArray(): FormArray {
        return this.form.controls[this.element.name] as FormArray;
    }

    private getFormIndex(form: AbstractControl): number {
        return this.formArray.controls.indexOf(form);
    }

    onEditItemClick(form: AbstractControl): void {
        this.editEntry(form);
    }

    editEntry(entry: AbstractControl) {
        let index = this.formArray.controls.indexOf(entry);
        if (this.element.getPermission(this.element.canEditItem, this.formArray.value[index])) {
            this.entryState[index].editing = true;
        }
    }

    private isLastEntry(form: AbstractControl): boolean {
        let index = this.getFormIndex(form);
        return index < 0 || index === this.formArray.controls.length - 1;
    }

    isListItemControlRendered(form: AbstractControl, key?: string): boolean {
        switch(key) {
            case 'add':
                return this.element.canAddItem && this.isLastEntry(form);

            case 'edit':
                return this.element.getPermission(this.element.canEditItem, form.value) &&
                    (!this.isLastEntry(form) || !this.element.getPermission(this.element.canAddItem, form.value));

            case 'remove':
                return this.element.getPermission(this.element.canRemoveItem, form.value) &&
                    (!this.isLastEntry(form) || !this.element.getPermission(this.element.canAddItem, form.value));

            case 'reset': return this.isLastEntry(form);

            case 'save':
                return (
                    this.element.getPermission(this.element.canEditItem, form.value) ||
                    this.element.getPermission(this.element.canAddItem, form.value)
                    ) &&
                (!this.isLastEntry(form) || !this.element.canAddItem);
        }
        return true;
    }

}