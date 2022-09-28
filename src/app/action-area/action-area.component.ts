import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {TemplatePortal} from "@angular/cdk/portal";
import {Portal, PortalBridgeService} from "../portal-bridge.service";


@Component({
  selector: 'app-action-area',
  templateUrl: './action-area.component.html',
  styleUrls: ['./action-area.component.scss']
})
export class ActionAreaComponent implements OnInit {
  portal$: Observable<Portal>;

  constructor(private portalBridge: PortalBridgeService) { }

  ngOnInit(): void {
    this.portal$ = this.portalBridge.portal$;
  }

}
