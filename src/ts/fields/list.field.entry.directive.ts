import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
    selector: '[listEntry]'
})
export class ListFieldEntryDirective {

    constructor(
        private renderer: Renderer2,
        private elementRef: ElementRef
    ) {}

    // FIXME: this should be done with the renderer, but I'm not sure how
    public focusFirstInput(): void {
        this.elementRef.nativeElement.querySelector('input').focus();
    }

}