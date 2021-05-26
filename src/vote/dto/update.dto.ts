import { IsEmpty, IsNotEmpty, IsOptional } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { Topic } from "src/topics/topics.entity";
import { Option } from "src/option/option.entity";
import { ObjectId } from "bson";

export class UpdateVoteDto{
    
    @ApiProperty({type: Array})
    @IsOptional()
    @IsEmpty()
    optionId: ObjectId;
}