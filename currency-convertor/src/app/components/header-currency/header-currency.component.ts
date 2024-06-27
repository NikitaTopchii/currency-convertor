import {Component, inject, OnInit} from '@angular/core';
import {CurrencyDataService} from "../../../core/currency-data-service/currency-data.service";
import {forkJoin} from "rxjs";

@Component({
  selector: 'app-header-currency',
  standalone: true,
  imports: [],
  templateUrl: './header-currency.component.html',
  styleUrl: './header-currency.component.scss'
})
export class HeaderCurrencyComponent implements OnInit{

  private currencyDataService = inject(CurrencyDataService);

  currencyUSDtoUAH: number = 0;
  currencyEURtoUAH: number = 0;

  ngOnInit() {
    this.setCurrencyData();
  }

  setCurrencyData() {
    forkJoin({
      usd: this.currencyDataService.getCurrencyDataByValue('USD', 'UAH'),
      eur: this.currencyDataService.getCurrencyDataByValue('EUR', 'UAH')
    }).subscribe({
      next: ({ usd, eur }) => {
        this.currencyUSDtoUAH = usd.currencyCoefficient;
        this.currencyEURtoUAH = eur.currencyCoefficient;
      },
      error: (err) => {
        console.error('Error fetching currency data', err);
      }
    });
  }
}
