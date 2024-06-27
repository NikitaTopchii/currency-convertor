import { Component } from '@angular/core';
import {HeaderCurrencyComponent} from "../header-currency/header-currency.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    HeaderCurrencyComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
