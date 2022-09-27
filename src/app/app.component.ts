import {Component, OnInit} from '@angular/core';
import {ComponentPortal} from "@angular/cdk/portal";
import {Platform} from "@angular/cdk/platform";
import {Overlay, OverlayPositionBuilder} from "@angular/cdk/overlay";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {DialogComponent} from "./overlay-example/dialog/dialog.component";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-features';
  isWideScreen: Observable<boolean>

  constructor(
    private overly: Overlay,
    private positionBuilder: OverlayPositionBuilder,
    public platform: Platform,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
      if (this.breakpointObserver.isMatched('(max-width: 600px)')) {
        console.info(1)
      }

      this.isWideScreen = this.breakpointObserver.observe([Breakpoints.HandsetLandscape])
        .pipe(map(({matches}) => matches))
    }

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
