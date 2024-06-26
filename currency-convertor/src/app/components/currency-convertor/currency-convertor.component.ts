import { Component } from '@angular/core';
import {Form, FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-currency-convertor',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatSelect,
    MatOption,
    MatInput,
    MatLabel
  ],
  templateUrl: './currency-convertor.component.html',
  styleUrl: './currency-convertor.component.scss'
})
export class CurrencyConvertorComponent {

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.currencyConvertorForm;
  }

  get currencyConvertorForm(){
    return this.fb.group({
      firstValue: [''],
      secondValue: ['']
    });
  }
}
