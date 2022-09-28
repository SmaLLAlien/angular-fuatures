import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {ComponentPortal, TemplatePortal} from "@angular/cdk/portal";

export type Portal = TemplatePortal | ComponentPortal<any>;

@Injectable({
  providedIn: 'root'
})
export class PortalBridgeService {
  private activePortal = new Subject<Portal>();
  readonly portal$ = this.activePortal.asObservable();

  constructor() { }

  setPortal(portal: Portal) {
    this.activePortal.next(portal);
  }
}
