import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, filter, map} from "rxjs";

interface EndPoints {
  api: string,
  licenseCheck: string
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private endpoints = new BehaviorSubject<EndPoints | null>(null);
  api$ = this.endpoints.asObservable()
    .pipe(
      filter((endpoints) => !!endpoints),
      map((endpoints) => endpoints?.api)
    );

  constructor(private http: HttpClient) { }

  fetchEndpoints() {
    return this.http.get<EndPoints>('/test')
      .subscribe({
        next: (endpoints) => this.endpoints.next(endpoints),
        error: (endpoints) => this.endpoints.next({ api: '/test', licenseCheck: '' }),
      });
  }
}
