import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temperature'
})
export class TemperaturePipe implements PipeTransform {

  transform(degrees, unit): any {
    return degrees + '° ' + unit;
  }

}
