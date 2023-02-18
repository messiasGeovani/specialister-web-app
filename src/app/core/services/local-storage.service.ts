import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  save(key: string, value: unknown) {
    const encryptedValue = this.encryptObjData(value);
  }

  getValue(key: string) {
    const value = localStorage.getItem(key);
    const decryptedValue = this.decryptObjData(value);

    return decryptedValue;
  }

  encryptObjData(data: unknown) {
    return CryptoJS.AES.encrypt(
      JSON.stringify(data),
      environment.keyLocalStroage
    );
  }

  decryptObjData(data: unknown) {
    if (!data) {
      return null;
    }

    const bytes = CryptoJS.AES.decrypt(
      data.toString(),
      environment.keyLocalStroage
    );

    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }

  clear(key: string) {
    localStorage.removeItem(key);
  }
}
