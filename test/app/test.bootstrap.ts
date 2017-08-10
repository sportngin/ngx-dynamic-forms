import 'zone.js';
import 'reflect-metadata';

import './scss/style.scss';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { TestAppModule } from './test.app.module';

console.log('test.bootstrap');
document.addEventListener('DOMContentLoaded', () => {
    platformBrowserDynamic().bootstrapModule(TestAppModule);
});