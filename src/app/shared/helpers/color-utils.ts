import { harmony } from 'simpler-color';

export class ColorUtils {
  static generateColorPallete(color: string) {
    if (!color) {
      return;
    }

    return harmony(color);
  }
}
