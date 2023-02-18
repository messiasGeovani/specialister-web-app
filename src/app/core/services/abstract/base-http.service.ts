import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CamelCaseUtils } from 'src/app/shared/helpers/camel-case-utils';
import { AbstractResponse } from '../../models/abstract/abstract-reponse';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseHttpService {
  constructor(private readonly httpClient: HttpClient) {}

  get<T extends AbstractResponse<unknown>>(
    params?: string,
    headers?: HttpHeaders | { [header: string]: string | string[] }
  ): Observable<T> {
    return this.httpClient
      .get<T>(`${this.getApiUrl()}${params ? params : ''}`, { headers })
      .pipe(map((response: T) => CamelCaseUtils.camelizeKeys(response)));
  }

  post<T extends unknown>(
    body?: T,
    route?: string,
    headers?: HttpHeaders | { [header: string]: string | string[] }
  ): Observable<T> {
    let url = this.getApiUrl();

    if (route) {
      url = url.concat('/').concat(route);
    }

    return this.httpClient
      .post<T>(url, body, { headers })
      .pipe(map((response: T) => CamelCaseUtils.camelizeKeys(response)));
  }

  abstract getApiUrl(): string;
}
