import { Component } from '@angular/core';
import {AbstractControl, FormControl} from "@angular/forms";

@Component({
  selector: 'app-search-form-field-container',
  templateUrl: './search-form-field-container.component.html',
  styleUrls: ['./search-form-field-container.component.scss'],
})
export class SearchFormFieldContainerComponent {
  formControl = new FormControl({scope: '', query: ''}, AdvancedSearchValidation);
}

function AdvancedSearchValidation(control: AbstractControl) {
  return control.value.scope !== null && control.value.query !== ''
    ? null
    : {
        validateSearch: {
          valid: true,
        }
    }
}
