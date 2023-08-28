import { Pipe, PipeTransform } from '@angular/core';
import { formatGerman } from "@app/common/util/date-util";

@Pipe({
    name: 'date',
    standalone: true
})
export class DatePipe implements PipeTransform {

  transform(value: Date): string {
    return formatGerman(value);
  }

}
