import {Component, inject, OnInit} from '@angular/core';
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CurrencyDataService} from "../../../core/currency-data-service/currency-data.service";
import {CurrencyValidatorService} from "../../../core/validators/currency-validator.service";
import {catchError, debounceTime, distinctUntilChanged, Observable, of, switchMap} from "rxjs";

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
  private currencyValidatorsService = inject(CurrencyValidatorService);

  form: FormGroup;
  private currencyList: string[] = ['USD', 'UAH', 'EUR'];
  private updating: boolean = false;

  constructor() {
    this.form = this.currencyConvertorForm;
  }

  ngOnInit() {
    this.subscribeToFormChanges();
    this.convertCurrency();
  }

  private subscribeToFormChanges() {
    const currencyValueControls: string[] = ['firstValue', 'firstValue'];
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

  private getCurrencyConvertData(firstCurrency: string, secondCurrency: string): Observable<number> {
    return this.currencyDataService.getCurrencyDataByValue(firstCurrency, secondCurrency).pipe(
      switchMap(currencyData => of(currencyData.currencyCoefficient)),
      catchError(error => {
        console.error('Error fetching currency data', error);
        return of(1);
      })
    );
  }

  private get currencyConvertorForm(): FormGroup {
    return this.fb.group({
      firstValue: [1, [Validators.required, this.currencyValidatorsService.numberValidator]],
      secondValue: [1, [Validators.required, this.currencyValidatorsService.numberValidator]],
      currencyFirst: ['USD'],
      currencySecond: ['UAH'],
    });
  }

  getCurrencyList(): string[] {
    return this.currencyList;
  }

  swapCurrency() {
    const firstCurrency = this.form.get('currencyFirst')?.value;
    const secondCurrency = this.form.get('currencySecond')?.value;
    const firstValue = this.form.get('firstValue')?.value;

    this.form.patchValue({
      currencyFirst: secondCurrency,
      currencySecond: firstCurrency,
      firstValue: firstValue,
    });

    this.convertCurrency();
  }

  private convertCurrency(changedField: string = 'firstValue') {
    if (this.updating) return;

    this.updating = true;

    const firstCurrency = this.form.get('currencyFirst')?.value;
    const secondCurrency = this.form.get('currencySecond')?.value;

    this.getCurrencyConvertData(firstCurrency, secondCurrency).subscribe(coefficient => {
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
