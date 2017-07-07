import {
    Component, Host, InjectionToken, Injector, Input, OnInit, ViewChildren, QueryList,
    AfterViewInit, ViewEncapsulation
} from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';

import { each, extend, last } from 'lodash';

import { FormComponentHost, hostProviders }        from '../form.component.host';
import { Model }                    from '../model/model';
import { ArrayControl }             from '../model/control/array.control';
import { FieldBase }                from './field.base';
import { ListFieldEntryDirective }  from './list.field.entry.directive';
import {
    behaviorProvider, BehaviorType, EditItemHandler, IsListItemControlRenderedHandler, RemoveItemHandler,
    ResetItemHandler, SaveItemHandler
} from '../behavior/behaviors';

const TOKENS = {
    template: new InjectionToken<Model>('template')
};

@Component({
    selector: 'list-field',
    templateUrl: './list.field.pug',
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
    OnInit, AfterViewInit,
    EditItemHandler, SaveItemHandler, RemoveItemHandler, ResetItemHandler,
    IsListItemControlRenderedHandler {

    @Input() template: Model;
    @ViewChildren(ListFieldEntryDirective) inputs: QueryList<ListFieldEntryDirective>;

    public entryState: { submitted: boolean, editing: boolean }[] = [];

    constructor(
        private fb: FormBuilder,
        @Host() host: FormComponentHost,
        injector: Injector
    ) {
        super(injector, host, TOKENS);
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

    ngAfterViewInit(): void {
        this.inputs.changes.subscribe((changes: QueryList<ListFieldEntryDirective>) => {
            if (changes.last && last(this.entryState).editing) {
                changes.last.focusFirstInput();
            }
        });
    }

    addEmptyEntryIfNeeded(): void {
        let lastEntry = last(this.entryState);
        if (this.control.canAddItem && (lastEntry.submitted || !lastEntry.editing)) {
            let form = this.template.toFormGroup(this.fb);
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
    }

    onResetItemClick(form: AbstractControl): void {
        form.reset({});
    }

    setEntry(value: any, index: number): void {
        let form;
        if (index >= this.formControl.length) {
            form = this.template.toFormGroup(this.fb);
            this.formControl.push(form);
            let state = { submitted: form.valid, editing: false};
            this.entryState.push(state);
            this.patchAndCheck(form, value, state);
        } else {
            form = this.formControl.controls[index];
            let state = { submitted: form.valid, editing: false };
            this.entryState[index] = state;
            this.patchAndCheck(form, value, state);
        }
        if (!form.valid) {
            this.editEntry(index);
        }
    }

    private patchAndCheck(form: AbstractControl, value: any, state: any): void {
        form.patchValue(value);
        setTimeout(() => {
            this.checkDirty(form);
            extend(state, { submitted: form.valid, editing: false });
            if (!form.valid) {
                this.editEntry(this.getFormIndex(form));
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
        return this.form.controls[this.controlName] as FormArray;
    }

    private getFormIndex(form: AbstractControl): number {
        return this.formArray.controls.indexOf(form);
    }

    onEditItemClick(form: AbstractControl): void {
        let index = this.getFormIndex(form);
        this.editEntry(index);
    }

    editEntry(index: number) {
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
                let isLastEntry = this.isLastEntry(form);
                return (
                    (!isLastEntry && this.control.getPermission(this.control.canEditItem, form.value)) ||
                    (isLastEntry && this.control.getPermission(this.control.canAddItem, form.value))
                );
        }
        return true;
    }

}