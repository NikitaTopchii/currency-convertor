import { Component } from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {CurrencyConvertorComponent} from "../currency-convertor/currency-convertor.component";

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    HeaderComponent,
    CurrencyConvertorComponent
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {

}
