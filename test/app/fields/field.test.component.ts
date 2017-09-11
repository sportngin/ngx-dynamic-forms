import { FormComponentHost, Model } from '@siplay/ng-dynamic-forms';

export abstract class FieldTestComponent extends FormComponentHost {

    constructor(model: Model) {
        super(model);
    }

    protected abstract get fieldName();

    protected abstract get modelSourcePath();

    protected doSubmit(): Promise<any> {
        console.log(`${this.constructor.name}.doSubmit() this.form.value:`, this.form.value);
        return new Promise((resolve) => {
            setTimeout(() => resolve(this.form.value), 1500);
        });
    }
}
