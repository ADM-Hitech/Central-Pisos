import { NgModule } from '@angular/core';
import { KeysPipe } from './keys.pipe';
import { GetByIdPipe } from './get-by-id.pipe';
import { HtmlToPlaintTextPipe } from './html-to-plaint-text.pipe';
import { FilterPipe } from './filter.pipe';
import { CamelCaseToDashPipe } from './camel-case-to-dash.pipe';

@NgModule({
    declarations: [
        KeysPipe,
        GetByIdPipe,
        HtmlToPlaintTextPipe,
        FilterPipe,
        CamelCaseToDashPipe
    ],
    imports: [],
    exports: [
        KeysPipe,
        GetByIdPipe,
        HtmlToPlaintTextPipe,
        FilterPipe,
        CamelCaseToDashPipe
    ]
})
export class AppPipeModule { }
