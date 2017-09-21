import { InjectionToken } from '@angular/core';

export interface LabelDisplayOptions {
    headerRow?: boolean;
    controls?: boolean;
    valueDisplays?: boolean;
}

export const LABEL_DISPLAY_OPTIONS = new InjectionToken<LabelDisplayOptions>('LabelDisplayOptions');