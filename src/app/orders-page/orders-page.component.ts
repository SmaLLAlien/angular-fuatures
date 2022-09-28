import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PortalBridgeService} from "../portal-bridge.service";
import {CdkPortal} from "@angular/cdk/portal";

export interface Order {
  item: string;
  address: string;
  country: string;
}


const ORDERS_DATA: Order[] = [
  { item: 'iPhone 12', address: 'Rammstein Straße 4', country: 'Germany' },
  { item: 'MacBook Pro', address: 'Oida Gasse 5', country: 'Austria' },
];


@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss']
})
export class OrdersPageComponent implements OnInit, OnDestroy {
  @ViewChild(CdkPortal, {static: true}) portalContent: CdkPortal;

  displayedColumns: string[] = ['item', 'address', 'country'];
  dataSource = ORDERS_DATA;


  constructor(private portalBridge: PortalBridgeService) { }

  ngOnInit(): void {
    this.portalBridge.setPortal(this.portalContent);
  }

  ngOnDestroy(): void {
    this.portalContent.detach();
  }

}
