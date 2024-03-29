import { Pipe, PipeTransform } from '@angular/core';
import { Status } from "@modules/admin/modules/user/store/status";

@Pipe({
    name: 'status',
    standalone: true
})
export class StatusPipe implements PipeTransform {

  transform(value: number): unknown {
    return Status[value];
  }

}
