import {HttpClient} from '@angular/common/http';
import { ITest } from '@realtime-xat/interfaces';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient) { }

  getTest(): Observable<ITest>{
    return this.http.get<ITest>('api/getServiceMessage');
  }
}
