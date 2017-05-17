import 'zone.js/dist/zone';
import 'zone.js/dist/long-stack-trace-zone';
import 'rxjs/add/operator/map';

import { NgModule }             from '@angular/core';
import { ReactiveFormsModule }  from '@angular/forms';
import { BrowserModule }        from '@angular/platform-browser';

import { DynamicFormsModule }   from '../src/ts/dynamic.forms.module';

import { TestAppComponent }             from './test.app.component';

@NgModule({
    bootstrap:      [ TestAppComponent ],
    declarations:   [
        TestAppComponent
    ],
    imports:        [
        BrowserModule,
        ReactiveFormsModule,
        DynamicFormsModule,
        // routing
    ],
    providers:      [
        // routingProviders
    ]
})
export class TestAppModule { }