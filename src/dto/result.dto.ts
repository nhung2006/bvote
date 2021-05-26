import { IsEmpty, IsNotEmpty, IsOptional } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class ResultDto{
    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    id: number;

}