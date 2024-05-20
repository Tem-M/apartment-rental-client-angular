import { Pipe, PipeTransform } from '@angular/core';
import { Apartment } from 'src/class/apartment';

@Pipe({
  name: 'img'
})
export class ImgPipe implements PipeTransform {

  transform(apt:Apartment): any {
    if (apt.img) {
        return 'http://localhost:3001/' + apt.img;
    }
    else {
        return 'http://localhost:3001/uploads/6306486.jpg'; // Provide the default URL here
    }
}

}
