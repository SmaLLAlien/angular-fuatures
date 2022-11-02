import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';
import {debounceTime, fromEvent, map, Observable, Subscription} from "rxjs";
import {BreakpointObserver} from "@angular/cdk/layout";



@Component({
  selector: 'app-svg-container',
  templateUrl: './svg-container.component.html',
  styleUrls: ['./svg-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SvgContainerComponent implements OnInit, AfterViewInit {
  @ViewChild('container') container: ElementRef;
  resizeObservable$: Observable<Event>;
  resizeSubscription$: Subscription;
  isWideScreen$: Observable<boolean>
  isWideScreen: boolean = true;

  b1 = [
    {name: 'Направление юридической координации деятельности', connection: ['Департамент претензионно-позивной работы', 'Управление правовой поддержки в г Киев']},
    {name: 'Направление правовой поддержки', connection: null},
    {name: 'Операционная работа', connection: null},
    {name: 'Менеджмент', connection: null},
  ]

  b2 = [
    {name: 'Департамент претензионно-позивной работы', connection: ['Обеспечение оплаты услуг адвокатов', 'Обеспечение деятельности направления']},
    {name: 'Управление правовой поддержки в г Киев', connection: null},
  ]

  b3 = [
    {name: 'Обеспечение оплаты услуг адвокатов', connection: [
        'Текущее ведение договоров адвокатов в ПК ПриватДоговор',
        'Валидация актов адвоката в Paperless FTE',
        'Формирование заявки на оплату услуг ПК Приватдоговор и сопровождение документов по оплате в сед приватдок',
        'Управление правовой поддержкой в м Киев1',
        'Управление правовой поддержкой в м Киев2',
        'Управление правовой поддержкой в м Киев3',
        'Управление правовой поддержкой в м Киев4',
      ]
    },
    {name: 'Обеспечение деятельности направления', connection: null},
  ]

  b4 = [
    {name: 'Текущее ведение договоров адвокатов в ПК ПриватДоговор', connection: [
      'Количество операция, шт, мес1',
      'Время исполнения операцииб часов1',
      ]
    },
    {name: 'Валидация актов адвоката в Paperless FTE', connection: [
        'Количество операция, шт, мес2',
        'Время исполнения операцииб часов2',
      ]
    },
    {name: 'Формирование заявки на оплату услуг ПК Приватдоговор и сопровождение документов по оплате в сед приватдок', connection: [
        'Количество операция, шт, мес3',
        'Время исполнения операцииб часов3',
      ]
    },
    {name: 'Управление правовой поддержкой в м Киев1', connection: null},
    {name: 'Управление правовой поддержкой в м Киев2', connection: null},
    {name: 'Управление правовой поддержкой в м Киев3', connection: null},
    {name: 'Управление правовой поддержкой в м Киев4', connection: null},
  ]

  b5 = [
    {name: 'Количество операция, шт, мес1', connection: null},
    {name: 'Время исполнения операцииб часов1', connection: null},
    {name: 'Количество операция, шт, мес2', connection: null},
    {name: 'Время исполнения операцииб часов2', connection: null},
    {name: 'Количество операция, шт, мес3', connection: null},
    {name: 'Время исполнения операцииб часов3', connection: null},
  ]

  constructor(private breakpointObserver: BreakpointObserver) { }

  ngAfterViewInit(): void {

    if (this.isWideScreen) {
      this.checkConnection();
    } else {
      this.checkConnectionOnSmaLL();
    }


    this.resizeObservable$ = fromEvent(window, 'resize')
    this.resizeSubscription$ = this.resizeObservable$
      .pipe(
        map(() => {
          const currSvg = document.getElementById('svg-canvas');
          if (currSvg) {
            currSvg.remove();
          }
        }),
        debounceTime(500)
      ).subscribe( evt => {
        if (this.isWideScreen) {
          this.checkConnection();
        } else {
          this.checkConnectionOnSmaLL();
        }
      })
  }

  ngOnInit(): void {
    this.isWideScreen$ = this.breakpointObserver.observe(['(max-width: 1400px)'])
      .pipe(map(({matches}) => matches))

    this.isWideScreen$.subscribe(isLessThen1400 => {
      console.log(isLessThen1400);
      if (isLessThen1400) {
        this.isWideScreen = false;
      } else {
        this.isWideScreen = true;
      }
      })
  }

  createSVG() {
    let svg: SVGSVGElement = document.getElementById("svg-canvas") as unknown as SVGSVGElement;
    if (svg === null) {
      svg = document.createElementNS("http://www.w3.org/2000/svg",
        "svg");
      svg.setAttribute('id', 'svg-canvas');
      svg.setAttribute('style', 'position:absolute;top:0px;left:0px');
      svg.setAttribute('width', this.container.nativeElement.clientWidth);
      svg.setAttribute('height', this.container.nativeElement.clientHeight);
      svg.setAttributeNS("http://www.w3.org/2000/xmlns/",
        "xmlns:xlink",
        "http://www.w3.org/1999/xlink");
      this.container.nativeElement.appendChild(svg);
    }
    return svg;
  }

  drawCurvedLine(x1: number, y1: number, x2: number, y2: number, color: string, tension: any) {
    const svg = this.createSVG();
    const shape = document.createElementNS("http://www.w3.org/2000/svg",
      "path");

    shape.classList.add('paaaaaath');

    const delta = (x2 - x1) * tension;
    const hx1 = x1 + delta;
    const hy1 = y1;
    const hx2 = x2 - delta;
    const hy2 = y2;
    const path = "M " + x1 + " " + y1 +
      " C " + hx1 + " " + hy1
      + " " + hx2 + " " + hy2
      + " " + x2 + " " + y2;
    shape.setAttributeNS(null, "d", path);
    shape.setAttributeNS(null, "fill", "none");
    shape.setAttributeNS(null, "stroke", color);
    shape.setAttributeNS(null, "stroke-width", '2');
    svg.appendChild(shape);
  }

  findAbsolutePosition(htmlElement: HTMLDivElement) {
    const x = htmlElement.offsetLeft;
    const y = htmlElement.offsetTop;

    return {
      "x": x,
      "y": y
    };
  }

  connectDivs(leftId: string, rightId: string, color: string, tension: number) {
    const left: HTMLDivElement = document.getElementById(leftId) as  HTMLDivElement;
    const right: HTMLDivElement = document.getElementById(rightId) as HTMLDivElement;

    const leftPos = this.findAbsolutePosition(left);
    let x1 = leftPos.x;
    let y1 = leftPos.y;
    x1 += left.offsetWidth;
    y1 += (left.offsetHeight / 2);

    const rightPos = this.findAbsolutePosition(right);
    let x2 = rightPos.x;
    let y2 = rightPos.y;
    y2 += (right.offsetHeight / 2);

    this.drawCurvedLine(x1, y1, x2, y2, color, tension);
  }

  private checkConnection() {
    this.b1.forEach((item, index) => {
      if (item.connection) {
        item.connection.forEach(linkedName => {
          const linkedB2ItemIndex: number = this.b2.findIndex((b2Item) => b2Item.name === linkedName);
          if (linkedB2ItemIndex !== -1) {
            this.connectDivs(`b1${index}`, `b2${linkedB2ItemIndex}`, 'orange', 1);
          }
        })

      }
    });

    this.b2.forEach((item, index) => {
      if (item.connection) {
        item.connection.forEach(linkedName => {
          const linkedB2ItemIndex: number = this.b3.findIndex((b2Item) => b2Item.name === linkedName);
          if (linkedB2ItemIndex !== -1) {
            this.connectDivs(`b2${index}`, `b3${linkedB2ItemIndex}`, 'orange', 1);
          }
        })
      }
    });

    this.b3.forEach((item, index) => {
      if (item.connection) {
        item.connection.forEach(linkedName => {
          const linkedB2ItemIndex: number = this.b4.findIndex((b2Item) => b2Item.name === linkedName);
          if (linkedB2ItemIndex !== -1) {
            this.connectDivs(`b3${index}`, `b4${linkedB2ItemIndex}`, 'orange', 1);
          }
        })
      }
    });

    this.b4.forEach((item, index) => {
      if (item.connection) {
        item.connection.forEach(linkedName => {
          const linkedB2ItemIndex: number = this.b5.findIndex((b2Item) => b2Item.name === linkedName);
          if (linkedB2ItemIndex !== -1) {
            this.connectDivs(`b4${index}`, `b5${linkedB2ItemIndex}`, 'orange', 1);
          }
        })
      }
    });
  }

  private checkConnectionOnSmaLL() {
    this.b1.forEach((item, index) => {
      if (item.connection) {
        item.connection.forEach(linkedName => {
          const linkedB2ItemIndex: number = this.b2.findIndex((b2Item) => b2Item.name === linkedName);
          if (linkedB2ItemIndex !== -1) {
            this.connectDivsOnSmall(`b1${index}`, `b2${linkedB2ItemIndex}`, 'red', true);
          }
        })

      }
    });

    this.b2.forEach((item, index) => {
      if (item.connection) {
        item.connection.forEach(linkedName => {
          const linkedB2ItemIndex: number = this.b3.findIndex((b2Item) => b2Item.name === linkedName);
          if (linkedB2ItemIndex !== -1) {
            this.connectDivsOnSmall(`b2${index}`, `b3${linkedB2ItemIndex}`, 'orange', false);
          }
        })
      }
    });

    this.b3.forEach((item, index) => {
      if (item.connection) {
        item.connection.forEach(linkedName => {
          const linkedB2ItemIndex: number = this.b4.findIndex((b2Item) => b2Item.name === linkedName);
          if (linkedB2ItemIndex !== -1) {
            this.connectDivsOnSmall(`b3${index}`, `b4${linkedB2ItemIndex}`, 'orange', true);
          }
        })
      }
    });

    this.b4.forEach((item, index) => {
      if (item.connection) {
        item.connection.forEach(linkedName => {
          const linkedB2ItemIndex: number = this.b5.findIndex((b2Item) => b2Item.name === linkedName);
          if (linkedB2ItemIndex !== -1) {
            this.connectDivsOnSmall(`b4${index}`, `b5${linkedB2ItemIndex}`, 'orange', false);
          }
        })
      }
    });
  }

  private  connectDivsOnSmall(leftId: string, rightId: string, color: string, isOdd: boolean) {
    const left: HTMLDivElement = document.getElementById(leftId) as  HTMLDivElement;
    const right: HTMLDivElement = document.getElementById(rightId) as HTMLDivElement;

    const leftPos = this.findAbsolutePosition(left);
    let x1 = leftPos.x;
    let y1 = leftPos.y;

    if (isOdd) {
      x1 += left.offsetWidth;
      y1 += (left.offsetHeight / 2);
    } else {
      // x1 -= left.offsetWidth;
      y1 += (left.offsetHeight / 2);
    }


    const rightPos = this.findAbsolutePosition(right);
    let x2 = rightPos.x;
    let y2 = rightPos.y;

    if (isOdd) {
      x2 += right.offsetWidth;
      y2 += (right.offsetHeight / 2);
    } else {
      // x2 -= right.offsetWidth;
      y2 += (right.offsetHeight / 2);
    }



    this.drawCurvedLineSmall(x1, y1, x2, y2, color, isOdd);
  }

  private drawCurvedLineSmall(x1: number, y1: number, x2: number, y2: number, color: string, isOdd?: boolean) {
    const svg = this.createSVG();
    const shape = document.createElementNS("http://www.w3.org/2000/svg",
      "path");
    shape.classList.add('paaaaaath')
    let hx1;
    let hy1;
    let hx2;
    let hy2;

    if (isOdd) {
      hx1 = x1 + 50;
      hy1 = y1 + 50;
      hx2 = x2 + 50;
      hy2 = y2 - 50;
    } else {
      hx1 = x1 - 50;
      hy1 = y1 - 50;
      hx2 = x2 - 50;
      hy2 = y2 + 50;
    }

    const path = "M " + x1 + " " + y1 +
      " C " + hx1 + " " + hy1
      + " " + hx2 + " " + hy2
      + " " + x2 + " " + y2;
    shape.setAttributeNS(null, "d", path);
    shape.setAttributeNS(null, "fill", "none");
    shape.setAttributeNS(null, "stroke", color);
    shape.setAttributeNS(null, "stroke-width", '2');
    svg.appendChild(shape);
  }
}
