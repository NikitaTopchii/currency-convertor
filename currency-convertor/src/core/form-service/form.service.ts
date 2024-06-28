import {inject, Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CurrencyValidatorService} from "../validators/currency-validator.service";

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private fb = inject(FormBuilder);
  private currencyValidatorsService = inject(CurrencyValidatorService);

  public get currencyConvertorForm(): FormGroup {
    return this.fb.group({
      firstValue: [1.00, [Validators.required, this.currencyValidatorsService.numberValidator]],
      secondValue: [1.00, [Validators.required, this.currencyValidatorsService.numberValidator]],
      currencyFirst: ['USD'],
      currencySecond: ['UAH'],
    });
  }
}
