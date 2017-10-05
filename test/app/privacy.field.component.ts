import { Component, Injector } from '@angular/core';

import { MemberData, FormMemberComponent } from '@siplay/ng-dynamic-forms';

@Component({
    selector: 'privacy-field',
    templateUrl: './privacy.field.component.pug'
})
export class PrivacyFieldComponent extends FormMemberComponent {

    public links: any = {
        privacy: 'https://subscription.timeinc.com/storefront/privacy/siplay/generic_privacy_new.html',
        terms: 'https://subscription.timeinc.com/storefront/privacy/siplay/privacy_terms_service.html'
    };

    constructor(
        elementData: MemberData,
        injector: Injector
    ) {
        super(elementData, injector);

        // disabling prevents the control from being included in the parent form's value output
        setTimeout(() => this.formControl.disable());
    }
}