import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CamelCaseUtils } from 'src/app/shared/helpers/camel-case-utils';
import { GlobalInjector } from '../../injectors/global.injector';
import { HttpResponse } from '../../models';

@Injectable({
  providedIn: 'root',
})
export abstract class HttpService {
  private readonly httpClient: HttpClient;

  constructor() {
    this.httpClient = GlobalInjector.injector.get(HttpClient);
  }

  get<R>(
    params?: string,
    headers?: HttpHeaders | { [header: string]: string | string[] }
  ): Observable<HttpResponse<R>> {
    return this.httpClient
      .get<R>(`${this.getApiUrl()}${params ? params : ''}`, { headers })
      .pipe(map((response: R) => CamelCaseUtils.camelizeKeys(response)));
  }

  post<T, R>(
    body?: T,
    route?: string,
    headers?: HttpHeaders | { [header: string]: string | string[] }
  ): Observable<HttpResponse<R>> {
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
