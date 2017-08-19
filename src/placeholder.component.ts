import { Component, TemplateRef, ViewChild } from '@angular/core';

@Component({
    selector: 'placeholder',
    template: ''
})
export class PlaceholderComponent {
    @ViewChild(TemplateRef) public template: TemplateRef<any>;
}