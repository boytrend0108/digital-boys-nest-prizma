import { Injectable, type PipeTransform } from '@nestjs/common';

@Injectable()
export class StringToLowercasePipe implements PipeTransform {
  transform(value: any) {
    if (typeof value === 'object' && value !== null) {
      if (value.name && typeof value.name === 'string') {
        value.name = value.name.toLowerCase();
      }
      return value;
    }

    return value;
  }
}
