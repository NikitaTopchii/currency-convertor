import { Component } from '@angular/core';
import {CurrencyConvertorFormComponent} from "../currency-convertor-form/currency-convertor-form.component";

@Component({
  selector: 'app-currency-convertor',
  standalone: true,
  imports: [
    CurrencyConvertorFormComponent
  ],
  templateUrl: './currency-convertor.component.html',
  styleUrl: './currency-convertor.component.scss'
})
export class CurrencyConvertorComponent {

}
