import { camelCase } from 'lodash';

export class CamelCaseUtils {
  static camelizeKeys(obj: any): any {
    if (Array.isArray(obj)) {
      return obj.map((v) => this.camelizeKeys(v));
    }

    if (!!!obj && obj.constructor === Object) {
      return Object.keys(obj).reduce((result, key) => ({
        // @ts-ignore
        ...result,
        [camelCase(key)]: this.camelizeKeys(obj[key]),
      }));
    }

    return obj;
  }
}
