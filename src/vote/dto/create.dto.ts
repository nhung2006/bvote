import { IsEmpty, IsNotEmpty, IsOptional } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { Topic } from "src/topics/topics.entity";
import { Option } from "src/option/option.entity";

export class CreateVoteDto{
    @ApiProperty({type: Object})
    @IsOptional()
    @IsEmpty()
    topicId: object;

    @ApiProperty({type: []})
    @IsOptional()
    @IsEmpty()
    optionId: [];

    @ApiProperty()
    @IsOptional()
    @IsEmpty()
    username: string;

    // @ApiProperty()
    // @IsOptional()
    // @IsNotEmpty()
    // name: string;

    // @ApiProperty()
    // @IsOptional()
    // @IsNotEmpty()
    // name: string;
}