import {Component, OnDestroy, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {PortalBridgeService} from "../portal-bridge.service";
import {CdkPortal, ComponentPortal} from "@angular/cdk/portal";
import {ActionsButtonsComponent} from "../actions-buttons/actions-buttons.component";

export interface User {
  name: string;
  lastName: string;
  profession: string;
}


const USER_DATA: User[] = [
  {name: 'Dmytro', lastName: 'Mezhenskyi', profession: 'Frontend Developer'},
  {name: 'Daria', lastName: 'Lazurenko', profession: 'UI Designer'},
];


@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit, OnDestroy {
  @ViewChild(CdkPortal, {static: true}) portalContent: CdkPortal;

  componentPortal: ComponentPortal<ActionsButtonsComponent>

  displayedColumns: string[] = ['name', 'lastName', 'profession'];
  dataSource = USER_DATA;

  constructor(private portalBridge: PortalBridgeService,
              private viewContainerRef: ViewContainerRef) { }

  ngOnInit(): void {
    // 1
    // const portal = new TemplatePortal(this.portalContent, this.viewContainerRef);
    // this.portalBridge.setPortal(portal);

    // 2
    this.portalBridge.setPortal(this.portalContent);

    // 3
    // this.componentPortal = new ComponentPortal<ActionsButtonsComponent>(ActionsButtonsComponent);
    // this.portalBridge.setPortal(this.componentPortal);
  }

  ngOnDestroy(): void {
    this.portalContent.detach();
    // this.componentPortal.detach();
  }

  clickHandler() {
    console.log('clicked');
  }
}
