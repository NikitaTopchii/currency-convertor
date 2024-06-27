import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {inject} from "@angular/core";
import {main_url} from "../../shared/application.context";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CurrencyDataService {

  private http = inject(HttpClient);

  getCurrencyDataByValue(firstCurrency: string, secondCurrency: string){

    const adjusted = true;
    const apiKey = 'AZfMpKfqODf4N8JenBq4cGlhi38NQeF0';

    return this.http.get(main_url + firstCurrency + secondCurrency + '/prev', { params: { adjusted, apiKey }})
      .pipe(map((response:any) => response.results))
      .pipe(map((data:any) => {
        return { currencyCoefficient: data[0].vw }
      }))
  }
}
