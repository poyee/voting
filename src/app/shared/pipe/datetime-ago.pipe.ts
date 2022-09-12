import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datetimeAgo',
  pure: true
})
export class DateTimeAgoPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value) {
      const seconds = Math.floor((+new Date() - +new Date(value)) / 1000);

      if (seconds < 29) {
        return '剛剛';
      }

      const intervals: { [key: string]: number } = {
        年: 31536000,
        個月: 2592000,
        週: 604800,
        天: 86400,
        小時: 3600,
        分鐘: 60,
        秒: 1
      };

      let counter;

      for (const unit in intervals) {
        counter = Math.floor(seconds / intervals[unit]);

        if (counter > 0) {
          return `${counter}${unit}前`;
        }
      }
    }

    return value;
  }

}
