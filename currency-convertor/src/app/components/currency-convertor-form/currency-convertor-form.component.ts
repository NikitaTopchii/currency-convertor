import {Component, inject, OnInit} from '@angular/core';
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CurrencyDataService} from "../../../core/currency-data-service/currency-data.service";
import {CurrencyValidatorService} from "../../../core/validators/currency-validator.service";

@Component({
  selector: 'app-currency-convertor-form',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    ReactiveFormsModule,
    MatError
  ],
  templateUrl: './currency-convertor-form.component.html',
  styleUrl: './currency-convertor-form.component.scss'
})
export class CurrencyConvertorFormComponent implements OnInit{

  private fb = inject(FormBuilder);
  private currencyDataService = inject(CurrencyDataService)
  private currencyValidatorsService = inject(CurrencyValidatorService);

  form: FormGroup;

  private currencyList: string[] = ['USD', 'UAH', 'EUR'];

  constructor() {
    this.form = this.currencyConvertorForm;
  }

  ngOnInit() {

    this.getCurrencyConvertData();

    this.form.get('currencyFirst')?.valueChanges.subscribe(() => {
      this.convertCurrency();
    })
    this.form.get('currencySecond')?.valueChanges.subscribe(() => {
      this.convertCurrency();
    })
  }

  getCurrencyConvertData(){
    const firstCurrencyValue = this.form.get('currencyFirst')?.value;
    const secondCurrencyValue = this.form.get('currencySecond')?.value;

    this.currencyDataService.getCurrencyDataByValue(firstCurrencyValue, secondCurrencyValue).subscribe((currencyData) => {

      const firstCurrencyValue = this.form.get('firstValue')?.value;

      this.form.patchValue({
        secondValue: firstCurrencyValue * currencyData.currencyCoefficient
      })
    })
  }

  get currencyConvertorForm(){
    return this.fb.group({
      firstValue: [1, [Validators.required, this.currencyValidatorsService.numberValidator]],
      secondValue: [0, [Validators.required, this.currencyValidatorsService.numberValidator]],
      currencyFirst: ['USD'],
      currencySecond: ['UAH'],
    });
  }

  getCurrencyList(){
    return this.currencyList;
  }

  swapCurrency(){

    const firstCurrency = this.form.get('currencyFirst')?.value;
    const secondCurrency= this.form.get('currencySecond')?.value;
    const firstCurrencyValue = this.form.get('firstValue')?.value;

    this.form.patchValue({
      firstValue: firstCurrencyValue,
      currencyFirst: secondCurrency,
      currencySecond: firstCurrency,
    })

    this.convertCurrency();
  }

  convertCurrency() {
    this.getCurrencyConvertData();
  }
}
