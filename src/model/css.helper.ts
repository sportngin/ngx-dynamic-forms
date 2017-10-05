import { chain } from 'lodash';

export function cleanCssClass(cssClass: string): string {
    return cssClass.replace(/\./g, ' ').trim();
}

export function getCssClassArray(...cssClass: string[]): string[] {
    return chain(cssClass)
        .map(entry => cleanCssClass(entry).split(' '))
        .flatten()
        .value() as string[];
}

export function getCssClassFromArray(cssClasses: string[]): string {
    return cssClasses ? cssClasses.join(' ') : null;
}