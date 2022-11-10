import {
  Component, ElementRef, HostBinding, Input, OnDestroy, OnInit, Optional, Self, ViewChild,
} from '@angular/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import {
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  NgControl
} from "@angular/forms";
import {Subject, take} from "rxjs";
import {FocusMonitor} from "@angular/cdk/a11y";
import {MatInput} from "@angular/material/input";
import {ErrorStateMatcher} from "@angular/material/core";

export interface FormFieldValue {
  query: string;
  scope: string;
}

export class CustomErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl): boolean {
    return control.dirty && control.invalid;
  }

}

@Component({
  selector: 'app-custom-form-field-control',
  templateUrl: './custom-form-field-control.component.html',
  styleUrls: ['./custom-form-field-control.component.scss'],
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: CustomFormFieldControlComponent,
    },
    {
      provide: ErrorStateMatcher,
      useClass: CustomErrorMatcher
    }
  ],
})
export class CustomFormFieldControlComponent implements MatFormFieldControl<FormFieldValue>, OnInit, OnDestroy, ControlValueAccessor {
  @ViewChild(MatInput, {read: ElementRef, static: true}) input: ElementRef;
  static nextId = 0;
  @Input()
  set value(value: FormFieldValue) {
    this.form.patchValue(value);
    this.stateChanges.next();
  }
  get value() {
    return this.form.value;
  }

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

  get errorState() {
    return this.errorMatcher.isErrorState(this.ngControl.control, null);
  };
  focused: boolean;

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

  form: FormGroup;

  constructor(private focusMonitor: FocusMonitor,
              private fb: FormBuilder,
              private errorMatcher: ErrorStateMatcher,
              @Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
    this.form = this.fb.group({
      scope: new FormControl(''),
      query: new FormControl(''),
    })
  }

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
    this.focusMonitor.monitor(this.input).pipe(take(1)).subscribe(() => {
      this.onTouch();
    });

    this.form.valueChanges.subscribe(value => this.onChange(value));
  }

  readonly autofilled: boolean;

  onChange: (value: FormFieldValue) => void
  onTouch: () => void

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  writeValue(obj: FormFieldValue): void {
    this.form.patchValue(obj);
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
    this.form.disable();
    this.stateChanges.next();
  }

}
