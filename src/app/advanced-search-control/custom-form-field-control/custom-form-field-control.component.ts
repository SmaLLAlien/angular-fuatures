import {
  Component, ElementRef, HostBinding, Input, OnDestroy, OnInit, ViewChild,
} from '@angular/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import {AbstractControlDirective, NgControl} from "@angular/forms";
import {Subject} from "rxjs";
import {FocusMonitor} from "@angular/cdk/a11y";
import {MatInput} from "@angular/material/input";

export interface FormFieldValue {
  query: string;
  scope: string;
}

@Component({
  selector: 'app-custom-form-field-control',
  templateUrl: './custom-form-field-control.component.html',
  styleUrls: ['./custom-form-field-control.component.scss'],
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: CustomFormFieldControlComponent,
    }
  ],
})
export class CustomFormFieldControlComponent implements MatFormFieldControl<FormFieldValue>, OnInit, OnDestroy {
  @ViewChild(MatInput, {read: ElementRef, static: true}) input: ElementRef;
  static nextId = 0;
  @Input()
  set value(value: FormFieldValue) {
    this._value = value;
    this.stateChanges.next();
  }
  get value() {
    return this._value;
  }
  private _value: FormFieldValue;

  @Input()
  set placeholder(placeholder: string) {
    this._placeholder = placeholder;
    this.stateChanges.next();
  }
  get placeholder() {
    return this._placeholder;
  }
  private _placeholder: string;

  readonly stateChanges = new Subject<void>();

  @HostBinding() id = `custom-form-field-id-${CustomFormFieldControlComponent.nextId++}`;
  @HostBinding('attr.aria-describedby') describedBy = '';

  readonly controlType = 'custom-form-field';

  get empty() {
    return !this.value.query && !this.value.scope;
  }
  errorState = false;
  focused: boolean;
  readonly ngControl: NgControl | AbstractControlDirective | null = null;

  onContainerClick(event: MouseEvent): void {
    this.focusMonitor.focusVia(this.input, 'program');
  }

  @Input() required: boolean;
  @Input() disabled: boolean;

  setDescribedByIds(ids: string[]): void {
    this.describedBy = ids.join(' ');
  }

  @HostBinding('class.floated') get shouldLabelFloat() {
    return true;
    // return this.focused || !this.empty;
  }

  readonly userAriaDescribedBy: string;

  constructor(private focusMonitor: FocusMonitor) {}

  ngOnDestroy(): void {
        this.focusMonitor.stopMonitoring(this.input);
        this.stateChanges.complete();
    }

  ngOnInit(): void {
    this.focusMonitor
      .monitor(this.input)
      .subscribe(focused => {
        this.focused = !!focused;
        this.stateChanges.next();
      });
  }

}
