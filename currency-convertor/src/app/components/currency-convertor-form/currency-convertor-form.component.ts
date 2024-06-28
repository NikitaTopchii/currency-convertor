import {Component, inject, OnInit} from '@angular/core';
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CurrencyDataService} from "../../../core/currency-data-service/currency-data.service";
import {CurrencyValidatorService} from "../../../core/validators/currency-validator.service";
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  mergeMap,
  Observable,
  of,
  retryWhen,
  switchMap,
  throttleTime, throwError, timer
} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";
import {FormService} from "../../../core/form-service/form.service";

type Currency = 'USD' | 'UAH' | 'EUR' | 'GBP';

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
  private currencyDataService = inject(CurrencyDataService);
  private formService = inject(FormService);

  form: FormGroup;
  private readonly currencyList: Currency[];
  private updating: boolean;


  constructor() {
    this.form = this.formService.currencyConvertorForm;
    this.currencyList = ['USD', 'UAH', 'EUR', 'GBP'];
    this.updating = false;
  }

  ngOnInit() {
    this.subscribeToFormChanges();
    this.convertCurrency();
  }

  private subscribeToFormChanges() {
    const currencyValueControls: string[] = ['firstValue', 'secondValue'];
    currencyValueControls.forEach(control => {
      this.form.get(control)?.valueChanges
        .pipe(
          debounceTime(300),
          distinctUntilChanged()
        )
        .subscribe(() => {
          if (!this.updating) {
            this.convertCurrency(control);
          }
        });
    })

    const currencyControls = ['currencyFirst', 'currencySecond'];
    currencyControls.forEach(control => {
      this.form.get(control)?.valueChanges.subscribe(() => {
        this.convertCurrency();
      });
    });
  }

  public getCurrencyList(){
    return this.currencyList;
  }

  public swapCurrency() {
    const firstCurrency = this.form.get('currencyFirst')?.value;
    const secondCurrency = this.form.get('currencySecond')?.value;

    this.form.patchValue({
      currencyFirst: secondCurrency,
      currencySecond: firstCurrency,
    }, { emitEvent: false });

    this.convertCurrency();
  }

  private convertCurrency(changedField: string = 'firstValue') {
    if (this.updating) return;

    this.updating = true;

    const firstCurrency = this.form.get('currencyFirst')?.value;
    const secondCurrency = this.form.get('currencySecond')?.value;

    this.currencyDataService.getCurrencyCoefficient(firstCurrency, secondCurrency).subscribe(coefficient => {
      if (changedField === 'firstValue') {
        const firstValue = this.form.get('firstValue')?.value;
        this.form.patchValue({
          secondValue: firstValue * coefficient
        }, { emitEvent: false });
      } else {
        const secondValue = this.form.get('secondValue')?.value;
        this.form.patchValue({
          firstValue: secondValue / coefficient
        }, { emitEvent: false });
      }

      this.updating = false;
    });
  }
}
