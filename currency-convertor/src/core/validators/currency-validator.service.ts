import { Injectable } from '@angular/core';
import {AbstractControl, ValidationErrors} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class CurrencyValidatorService {

  constructor() {}

  numberValidator(control: AbstractControl): ValidationErrors | null {
    const valid = /^-?\d*\.?\d+$/.test(control.value);
    return valid ? null : { number: { value: control.value } };
  }
}
