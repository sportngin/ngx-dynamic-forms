import { FormHostComponent, Model } from '@siplay/ng-dynamic-forms';

export abstract class FieldTestComponent extends FormHostComponent {

    constructor(model: Model) {
        super(model);
    }

    public abstract get fieldName();

    public abstract get modelSourcePath();

    public doSubmit(): Promise<any> {
        console.log(`${this.constructor.name}.doSubmit() this.form.value:`, this.form.value);
        return new Promise((resolve) => {
            setTimeout(() => resolve(this.form.value), 1500);
        });
    }
}
