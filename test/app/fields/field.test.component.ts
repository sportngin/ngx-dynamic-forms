import { FormComponentHost, Model } from 'ng-dynamic-forms';

export abstract class FieldTestComponent extends FormComponentHost {

    constructor(model: Model) {
        super(model);
    }

    protected abstract get fieldName();

    protected abstract get modelSourcePath();

    protected doSubmit(): void {
        console.log(`${this.constructor.name}.doSubmit() this.form.value:`, this.form.value)
    }
}
