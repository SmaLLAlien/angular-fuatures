import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemComponent implements OnInit {
  @Input() blockTitle: string = '';
  @Input() index: number = 0;
  @Input() type: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
