import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; // handles async calls

import { Trip } from '../models/trip';

@Injectable({
  providedIn: 'root'
})

export class TripDataService {
  url = 'http://localhost:3000/api/trips';

  constructor(private http: HttpClient) {}

  getTrips() : Observable<Trip[]> {
    return this.http.get<Trip[]>(this.url);
  }
}
