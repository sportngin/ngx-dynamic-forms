import { Component, Injector } from '@angular/core';

import { FieldBase, FormComponentHost } from '@siplay/ng-dynamic-forms';

@Component({
    selector: 'privacy-field',
    templateUrl: './privacy.field.pug'
})
export class PrivacyFieldComponent extends FieldBase {

    public links: any = {
        privacy: 'https://subscription.timeinc.com/storefront/privacy/siplay/generic_privacy_new.html',
        terms: 'https://subscription.timeinc.com/storefront/privacy/siplay/privacy_terms_service.html'
    };

    constructor(
        injector: Injector,
        host: FormComponentHost
    ) {
        super(injector, host);

        // disabling prevents the control from being included in the parent form's value output
        setTimeout(() => this.formControl.disable());
    }
}