import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nis'
})
export class NisPipe implements PipeTransform {

  transform(value?:Number): unknown {
    if(value)
      return '₪'+value;
    else 
      return '₪---'
  }

}
