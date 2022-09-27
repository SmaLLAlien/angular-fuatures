import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayExampleModule } from "./overlay-example/overlay-example.module";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {LayoutModule} from "@angular/cdk/layout";


@NgModule({
  declarations: [
    AppComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        OverlayExampleModule,
        MatToolbarModule,
        MatButtonModule,
        LayoutModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
