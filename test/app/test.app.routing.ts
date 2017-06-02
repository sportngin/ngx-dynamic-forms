import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestHomeComponent }    from './test.home.component';
import { TestFieldsComponent }  from './fields/test.fields.component';
import { fieldsChildRoutes }    from './fields/test.fields.routing';

export const routes: Routes = [
    { path: '', component: TestHomeComponent },

    { path: 'field', component: TestFieldsComponent, children: fieldsChildRoutes }
];

export const routingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);