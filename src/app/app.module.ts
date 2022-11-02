import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';

import { ComplexFormControlModule } from './complex-form-control/complex-form-control.module';
import { SvgContainerComponent } from './svg-container/svg-container.component';
import {AppRoutingModule} from "./app-routing.module";
import { ItemComponent } from './item/item.component';
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [AppComponent, SvgContainerComponent, ItemComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    LayoutModule,
    ComplexFormControlModule,
    AppRoutingModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
