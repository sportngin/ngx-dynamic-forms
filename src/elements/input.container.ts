import { InjectionToken } from '@angular/core';

export interface InputContainer {
    addCssClass(cssClass: string): void;
    removeCssClass(cssClass: string): void;
}

export const INPUT_CONTAINER_PROVIDER = new InjectionToken<InputContainer>('InputContainer');