import 'zone.js/dist/zone';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { TestAppModule } from './test.app.module';

import './scss/style.scss';

console.log('test.bootstrap');
platformBrowserDynamic().bootstrapModule(TestAppModule);
