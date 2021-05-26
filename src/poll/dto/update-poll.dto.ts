import { IsEmpty, IsNotEmpty, IsOptional } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { Topic } from "src/topics/topics.entity";
import { Option } from "src/option/option.entity";

export class UpdatePollDto{


    @ApiProperty()
    @IsOptional()
    @IsEmpty()
    optionId: number;
    
    @ApiProperty()
    @IsOptional()
    @IsEmpty()
    username: string;
}