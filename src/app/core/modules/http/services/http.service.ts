import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { GlobalInjector } from 'src/app/core/injectors/global.injector';
import { CamelCaseUtils } from 'src/app/shared/helpers';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root',
})
export abstract class HttpService {
  private readonly httpClient = GlobalInjector.injector.get(HttpClient);

  protected get<R>(
    params?: string,
    headers?: HttpHeaders | { [header: string]: string | string[] }
  ): Observable<R> {
    return this.httpClient
      .get<Response<R>>(`${this.getApiUrl()}${params ? params : ''}`, {
        headers,
      })
      .pipe(map((response) => CamelCaseUtils.camelizeKeys(response.data)));
  }

  protected post<T, R>(
    body?: T,
    route?: string,
    headers?: HttpHeaders | { [header: string]: string | string[] }
  ): Observable<R> {
    let url = this.getApiUrl();

    if (route) {
      url = url.concat('/').concat(route);
    }

    return this.httpClient
      .post<Response<R>>(url, body, { headers })
      .pipe(map((response) => CamelCaseUtils.camelizeKeys(response.data)));
  }

  protected put<T, R>(
    body?: T,
    route?: string,
    params?: string,
    headers?: HttpHeaders | { [header: string]: string | string[] }
  ): Observable<R> {
    let url = this.getApiUrl();

    if (route) {
      url = url.concat('/').concat(route);
    }

    if (params) {
      url = url.concat('/').concat(params);
    }

    return this.httpClient
      .put<Response<R>>(url, body, { headers })
      .pipe(map((response) => CamelCaseUtils.camelizeKeys(response.data)));
  }

  protected patch<R>(
    params?: string,
    headers?: HttpHeaders | { [header: string]: string | string[] }
  ): Observable<R> {
    return this.httpClient
      .patch<Response<R>>(`${this.getApiUrl()}${params ? params : ''}`, {
        headers,
      })
      .pipe(map((response) => CamelCaseUtils.camelizeKeys(response.data)));
  }

  abstract getApiUrl(): string;
}
