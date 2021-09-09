import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

 
  transform(value: any, input: string) {

    if (!value) {
      return [];
    }
    if (!input) {
      return value;
    }
    var values = []
    if (input) {
      input = input.toLowerCase();
      return value.filter(function (el: any) {
        values = Object.keys(el).map(key => el[key]);
        let result = false;
        for (var i in values) {
          result = values != null && values[i] != null && values[i] != undefined && values[i].toString().toLowerCase().indexOf(input) > -1;
          if(result){
            return true
          }
        }
        return false;
      })
    }
    return value;
  }
}
