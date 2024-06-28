import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {inject} from "@angular/core";
import {catchError, map, mergeMap, Observable, of, retryWhen, switchMap, throttleTime, throwError, timer} from "rxjs";
import {CurrencyData} from "../../shared/types/currency-data";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CurrencyDataService {

  private http = inject(HttpClient);
  private toastr = inject(ToastrService);

  private readonly retryDelay = 60000;
  private readonly retries = 5;

  private readonly main_url = environment.apiUrl;

  getCurrencyDataByValue(firstCurrency: string, secondCurrency: string){

    const apiKey = 'AZfMpKfqODf4N8JenBq4cGlhi38NQeF0';

    return this.http.get(this.main_url + firstCurrency + secondCurrency + '/prev', { params: { apiKey }})
      .pipe(map((response:any) => response.results))
      .pipe(map((data:any):CurrencyData => {
        return { currencyCoefficient: data[0].vw }
      }))
  }

  getCurrencyCoefficient(firstCurrency: string, secondCurrency: string): Observable<number> {
    if(firstCurrency === secondCurrency){
      return of(1.00);
    } else {
      return this.getCurrencyDataByValue(firstCurrency, secondCurrency).pipe(
        throttleTime(60000),
        switchMap(currencyData => of(currencyData.currencyCoefficient)),
        retryWhen(errors =>
          errors.pipe(
            mergeMap((error, index) => {
              if (index >= this.retries) {
                return throwError(error);
              }
              if (error.status === 429) {
                this.toastr.error('The request limit has been exceeded. Please try again later.');
                return timer(this.retryDelay);
              }
              return throwError(error);
            })
          )
        ),
        catchError(error => {
          this.toastr.error('Error when receiving currency data');
          return of(1);
        })
      );
    }
  }
}
