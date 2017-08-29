import {
    Component, Injector, OnInit, ViewChildren, QueryList, AfterViewInit, ViewEncapsulation, Inject, ViewContainerRef,
    ViewChild, AfterContentChecked
} from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';

import { chain, each, extend, find, last } from 'lodash';

import { ComponentInfo }            from '../component.info';
import { ControlManager }           from '../control.manager';
import { ElementData }              from '../elements/element.data';
import { Model }                    from '../model/model';
import { ArrayControl }             from '../model/control/array.control';
import { ModelControl, ModelMemberControl } from '../model/control/model.control';
import {
    behaviorProvider, BehaviorType, EditItemHandler, IsListItemControlRenderedHandler, RemoveItemHandler,
    ResetItemHandler, SaveItemHandler
} from '../behavior/behaviors';
import { TEMPLATE }                 from '../parent.component';
import { FieldBase }                from './field.base';
import { FieldData }                from './field.data';
import { ListFieldEntryComponent }  from './list.field.entry.component';
import { ListFieldEntryDirective }  from './list.field.entry.directive';

export interface EntryState {
    submitted: boolean,
    editing: boolean;
}

export interface ListEntryData extends FieldData {
    entryState: EntryState
}

@Component({
    selector: 'ul [list-field]',
    template: TEMPLATE,
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
export class ListFieldComponent extends FieldBase<FormArray, ArrayControl> implements
    OnInit, AfterViewInit, AfterContentChecked,
    EditItemHandler, SaveItemHandler, RemoveItemHandler, ResetItemHandler,
    IsListItemControlRenderedHandler {

    @ViewChild('container', { read: ViewContainerRef }) public container: ViewContainerRef;
    @ViewChildren(ListFieldEntryDirective) private inputs: QueryList<ListFieldEntryDirective>;

    public itemTemplate: Model;
    public entryState: EntryState[] = [];
    public get childControls(): ModelControl[] { return this.control ? this.control.childControls : null; }

    private initialized: boolean = false;

    constructor(
        elementData: FieldData,
        private controlManager: ControlManager,
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

    private createComponent(entry: FormGroup, entryState: EntryState): ComponentInfo[] {
        let entryData: ListEntryData = {
            form: entry,
            formControl: entry,
            entryState,
            control: this.control,
            childControls: this.childControls as ModelMemberControl[]
        };
        let providers = [
            { provide: ElementData, useValue: entryData }
        ];
        let components = this.controlManager.createComponent(this, this.control, ListFieldEntryComponent, providers);

        let entryComponent = find(components, componentInfo => componentInfo.component.instance.constructor === ListFieldEntryComponent);
        let componentInstance: ListFieldEntryComponent = entryComponent.component.instance as ListFieldEntryComponent;
        componentInstance.editEntry.subscribe(() => {
            console.log('editEntry', componentInstance.form);
            this.editEntry(componentInstance.form);
        });

        return components;
    }

    private createComponents(entries: FormGroup[], startIndex: number = 0): ComponentInfo[] {
        return chain(entries)
            .map((entry, index) => this.createComponent(entry as FormGroup, this.entryState[startIndex + index]))
            .flatten()
            .value() as ComponentInfo[];
    }

    ngAfterContentChecked(): void {
        if (!this.initialized) {
            return;
        }
        if (this.formControl.controls.length > this.container.length) {
            this.controlManager.insertComponents(
                ...this.createComponents(
                    this.formControl.controls.slice(this.container.length) as FormGroup[],
                    this.container.length
                )
            );
        }
    }

    ngAfterViewInit(): void {
        this.controlManager.insertComponents(
            ...this.createComponents(this.formControl.controls as FormGroup[])
        );
        this.initialized = true;

        this.inputs.changes.subscribe((changes: QueryList<ListFieldEntryDirective>) => {
            if (changes.last && last(this.entryState).editing) {
                changes.last.focusFirstInput();
            }
        });
    }

    addEmptyEntryIfNeeded(): void {
        let lastEntry = last(this.entryState);
        if (this.control.canAddItem && (lastEntry.submitted || !lastEntry.editing)) {
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
            extend(this.entryState[index], state);
            // this.entryState[index] = state;
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
            extend(state, { submitted: form.valid, editing: false });
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
        return this.form.controls[this.control.name] as FormArray;
    }

    private getFormIndex(form: AbstractControl): number {
        return this.formArray.controls.indexOf(form);
    }

    onEditItemClick(form: AbstractControl): void {
        this.editEntry(form);
    }

    editEntry(entry: AbstractControl) {
        let index = this.formArray.controls.indexOf(entry);
        if (this.control.getPermission(this.control.canEditItem, this.formArray.value[index])) {
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
                return this.control.canAddItem && this.isLastEntry(form);

            case 'edit':
                return this.control.getPermission(this.control.canEditItem, form.value) &&
                    (!this.isLastEntry(form) || !this.control.getPermission(this.control.canAddItem, form.value));

            case 'remove':
                return this.control.getPermission(this.control.canRemoveItem, form.value) &&
                    (!this.isLastEntry(form) || !this.control.getPermission(this.control.canAddItem, form.value));

            case 'reset': return this.isLastEntry(form);

            case 'save':
                return (
                    this.control.getPermission(this.control.canEditItem, form.value) ||
                    this.control.getPermission(this.control.canAddItem, form.value)
                    ) &&
                (!this.isLastEntry(form) || !this.control.canAddItem);
        }
        return true;
    }

}