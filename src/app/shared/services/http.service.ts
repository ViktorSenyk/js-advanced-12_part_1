import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  public getCountries(): Observable<object> {
    return this.http.get('http://localhost:3000/api/countries/get');
  }

  public getHotels(): Observable<object> {
    return this.http.get('http://localhost:3000/api/hotels/get');
  }

  public getAirlines(arr: string[]): Observable<object> {
    return this.http.post('http://localhost:3000/api/airlines/get', arr);
  }

  public orderTour(): Observable<object> {
    return this.http.get('http://localhost:3000/api/tour/get');
  }
}
