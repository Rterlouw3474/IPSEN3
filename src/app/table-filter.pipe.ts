import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tableFilter'
})
export class TableFilterPipe implements PipeTransform {

  transform(list: any[], value: any) {

    return value ? list.filter(item => item.decBeginPostal === value) : list;
  }

}
