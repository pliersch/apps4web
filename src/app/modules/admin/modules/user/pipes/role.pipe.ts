import { Pipe, PipeTransform } from '@angular/core';
import { Role } from "@modules/admin/modules/user/store/role";

@Pipe({
  name: 'role'
})
export class RolePipe implements PipeTransform {

  transform(value: number): string {
    return Role[value];
  }

}
