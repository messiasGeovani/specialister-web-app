export class TimerUtils {
  static wait(timeMs: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, timeMs);
    });
  }
}
