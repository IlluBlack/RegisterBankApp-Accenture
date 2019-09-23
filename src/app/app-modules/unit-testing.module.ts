import { NgModule } from '@angular/core';

import { MaterialDesignModule } from 'src/app/app-modules/material-design.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    imports: [
        MaterialDesignModule,
        HttpClientModule,
        BrowserAnimationsModule
    ],
    exports: [
        MaterialDesignModule,
        HttpClientModule,
        BrowserAnimationsModule
    ]
})
export class unitTestingModule { }

