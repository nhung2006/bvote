import { IsEmpty, IsNotEmpty, IsOptional } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { v4 } from 'uuid';

export class CreateTopicDto{

    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    content: string;

    @ApiProperty()
    @IsOptional()
    @IsEmpty()
    expire_date: string;
}