import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {SvgContainerComponent} from "./svg-container/svg-container.component";

const routes: Routes = [
  {path: '', component: AppComponent},
  {path: 'svg', component: SvgContainerComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
