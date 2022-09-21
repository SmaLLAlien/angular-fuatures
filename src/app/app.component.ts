import { Component } from '@angular/core';
import {ComponentPortal} from "@angular/cdk/portal";
import {Platform} from "@angular/cdk/platform";
import {Overlay, OverlayPositionBuilder} from "@angular/cdk/overlay";
import {BreakpointObserver} from "@angular/cdk/layout";
import {DialogComponent} from "./overlay-example/dialog/dialog.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-features';

  constructor(
    private overly: Overlay,
    private positionBuilder: OverlayPositionBuilder,
  ) {}

  createDialog() {
    const overlayRef = this.overly.create({
      hasBackdrop: true,
      positionStrategy: this.positionBuilder
        .global()
        .centerHorizontally()
        .centerVertically(),
    });
    const dialogPortal = new ComponentPortal(DialogComponent);
    overlayRef.attach(dialogPortal);
    overlayRef.backdropClick().subscribe(() => overlayRef.detach());
  }
}
