# @siplay/ng-dynamic-forms-hmr

Provides support for synchronizing form state for Angular reactive forms
created with `@siplay/ng-dynamic-forms`.

The HMR support is provided using `NgHmrManager` from
`@siplay/ng-project-util/hmr`.

To use, update your development bootstrap code to use the following:

```typescript
import { HmrHostModule } from '@siplay/js-project-util/hmr';
import { NgHmrManager }  from '@siplay/ng-project-util/hmr';

import { DynamicFormsHmrSynchronizer } from '@siplay/ng-dynamic-forms-hmr';

// Your entry module
import { AppModule } from './app/app.module';

declare const module: HmrHostModule;

NgHmrManager.init(
    module,
    platformBrowserDynamic().bootstrapModule(AppModule),
    DynamicFormsHmrSynchronizer
);
```
