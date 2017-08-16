import { Component, Inject, Injector } from '@angular/core';

import { FIELD_DATA_PROVIDER, FieldData, FieldBase } from '@siplay/ng-dynamic-forms';

@Component({
    selector: 'privacy-field',
    templateUrl: './privacy.field.component.pug'
})
export class PrivacyFieldComponent extends FieldBase {

    public links: any = {
        privacy: 'https://subscription.timeinc.com/storefront/privacy/siplay/generic_privacy_new.html',
        terms: 'https://subscription.timeinc.com/storefront/privacy/siplay/privacy_terms_service.html'
    };

    constructor(
        @Inject(FIELD_DATA_PROVIDER) elementData: FieldData,
        injector: Injector
    ) {
        super(elementData, injector);

        // disabling prevents the control from being included in the parent form's value output
        setTimeout(() => this.formControl.disable());
    }
}