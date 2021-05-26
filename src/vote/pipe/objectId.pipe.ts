
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { ObjectID } from 'bson';
import { isValidObjectId, Types } from 'mongoose';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any) {
    const validObjectId = Types.ObjectId.isValid(value);

    if(!validObjectId){
        throw new BadRequestException(`"${value}" is an invalid object id`)        
    }
    return Types.ObjectId.createFromHexString(value)
  }

}