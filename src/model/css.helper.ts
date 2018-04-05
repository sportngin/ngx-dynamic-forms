import { flatten } from 'lodash-es';

export function cleanCssClass(cssClass: string): string {
    return cssClass.replace(/\./g, ' ').trim();
}

export function getCssClassArray(...cssClass: string[]): string[] {
    return flatten(cssClass.map(entry => cleanCssClass(entry).split(' ')))
}

export function getCssClassFromArray(cssClasses: string[]): string {
    return cssClasses ? cssClasses.join(' ') : null;
}