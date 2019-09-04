import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hryvnia'
})
export class HryvniaPipe implements PipeTransform {
  // {value | pipes}
  transform(value: any, param: number, ...args: any[]): any {
    // if (!value) { return ''; }
    // return value + ' ₴';
    // console.log(value.split(' '));
    // if (!value) { return ''; }
    // return value
    //   .split(' ')
    //   .map(str => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase())
    //   .join(' ');
    if(!value) return [];
    return value.filter(user => user.age >= param);
  }

}
