import { IsEmpty, IsNotEmpty, IsOptional } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { Topic } from "src/topics/topics.entity";

export class CreateOptionDto{

    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    content: string;

    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    topicId: number;
}