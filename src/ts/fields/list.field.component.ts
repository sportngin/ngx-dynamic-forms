import {
    Component, Host, InjectionToken, Injector, Input, OnInit, ViewChildren, QueryList,
    AfterViewInit
} from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';

import { last } from 'lodash';

import {
    EditItemHandler, EditItemHandlerToken, IsRenderedHandler, IsRenderedHandlerToken,
    RemoveItemHandler, RemoveItemHandlerToken, ResetItemHandler, ResetItemHandlerToken,
    SaveItemHandler, SaveItemHandlerToken, UseAltTextHandler, UseAltTextHandlerToken,
} from '../button.handlers';
import { FormComponentHost }        from '../form.component.host';
import { Model }                    from '../model/model';
import { ArrayControl }             from '../model/control/array.control';
import { FieldBase }                from './field.base';
import { ListFieldEntryDirective }  from './list.field.entry.directive';

const TOKENS = {
    template: new InjectionToken<Model>('template')
};

@Component({
    selector: 'list-field',
    templateUrl: './list.field.pug',
    viewProviders: [{
        provide: EditItemHandlerToken,
        useExisting: ListFieldComponent
    }, {
        provide: SaveItemHandlerToken,
        useExisting: ListFieldComponent
    }, {
        provide: RemoveItemHandlerToken,
        useExisting: ListFieldComponent
    }, {
        provide: ResetItemHandlerToken,
        useExisting: ListFieldComponent
    }, {
        provide: UseAltTextHandlerToken,
        useExisting: ListFieldComponent
    }, {
        provide: IsRenderedHandlerToken,
        useExisting: ListFieldComponent
    }]
})
export class ListFieldComponent extends FieldBase<FormArray, ArrayControl> implements
    OnInit, AfterViewInit,
    EditItemHandler, SaveItemHandler, RemoveItemHandler, ResetItemHandler,
    UseAltTextHandler, IsRenderedHandler {

    @Input() template: Model;
    @ViewChildren(ListFieldEntryDirective) inputs: QueryList<ListFieldEntryDirective>;

    public state: {
        entries: { submitted: boolean, editing: boolean }[]
    } = { entries: [] };

    constructor(
        private fb: FormBuilder,
        @Host() host: FormComponentHost,
        injector: Injector
    ) {
        super(injector, host, TOKENS);
    }

    ngOnInit(): void {
        this.formControl.controls.forEach((entryControl: FormGroup) => {
            this.state.entries.push({ submitted: entryControl.valid, editing: !entryControl.valid });
        });

        this.addEmptyEntryIfNeeded();

        this.host.valueInjections.subscribe(injection => {
            if (injection.control !== this.formControl) {
                return;
            }
            let items = injection.value as any[];
            items.forEach((value, i) => this.setEntry(value, i));
            this.addEmptyEntryIfNeeded();
            this.formControl.reset(items);
        });
    }

    ngAfterViewInit(): void {
        this.inputs.changes.subscribe((changes: QueryList<ListFieldEntryDirective>) => {
            if (changes.last && last(this.state.entries).editing) {
                changes.last.focusFirstInput();
            }
        });
    }

    addEmptyEntryIfNeeded(): void {
        if (this.control.canAddItem && last(this.state.entries).submitted) {
            let form = this.template.toFormGroup(this.fb);
            this.formControl.push(form);
            this.state.entries.push({ submitted: false, editing: true });
        }
    }

    onSaveItemClick(form: AbstractControl): any {
        if (form.valid) {
            let index = this.formControl.controls.indexOf(form);

            this.state.entries[index].submitted = true;
            this.state.entries[index].editing = false;

            this.addEmptyEntryIfNeeded();
        }
        return false;
    }

    onRemoveItemClick(form: AbstractControl): void {
        let index = this.formControl.controls.indexOf(form);

        this.formControl.removeAt(index);
        this.state.entries.splice(index, 1);
    }

    onResetItemClick(form: AbstractControl): void {
        form.reset({});
    }

    setEntry(value: any, index: number): void {
        if (index >= this.formControl.length) {
            let form = this.template.toFormGroup(this.fb);
            form.patchValue(value);
            this.formControl.push(form);
            this.state.entries.push({ submitted: form.valid, editing: !form.valid });
        } else {
            let form = this.formControl.controls[index];
            form.patchValue(value);
            this.state.entries[index] = { submitted: form.valid, editing: !form.valid };
        }
    }

    get hasEntries(): boolean {
        return this.formControl.controls.length > 0 &&
                this.formControl.controls[0].valid &&
                this.state.entries[0].submitted;
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
        if (this.control.canEditItem) {
            this.state.entries[index].editing = true;
        }
    }

    useAltText(form: AbstractControl): boolean {
        let index = this.getFormIndex(form);
        return !this.state.entries[index].submitted;
    }

    private isLastEntry(form: AbstractControl): boolean {
        let index = this.getFormIndex(form);
        return index < 0 || index === this.formArray.controls.length - 1;
    }

    isChildRendered(form: AbstractControl, key?: string): boolean {
        // console.log('isChildRendered', key, this.getFormIndex(form));
        switch(key) {
            case 'add': return this.control.canAddItem && this.isLastEntry(form);
            case 'edit': return this.control.canEditItem && (!this.isLastEntry(form) || !this.control.canAddItem);
            case 'remove': return this.control.canRemoveItem && (!this.isLastEntry(form) || !this.control.canAddItem);
            case 'reset': return this.isLastEntry(form);
            case 'save': return (this.control.canEditItem || this.control.canAddItem) && (!this.isLastEntry(form) || !this.control.canAddItem);
        }
        return true;
    }

}