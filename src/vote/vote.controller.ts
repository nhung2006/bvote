import { Body, Controller, Get, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { ObjectID, ObjectId } from 'bson';
import { isValidObjectId } from 'mongoose';
import { CreateVoteDto } from './dto/create.dto';
import { UpdateVoteDto } from './dto/update.dto';
import { ValidationPipe } from './pipe/objectId.pipe';
import { VoteService } from './vote.service';

@Controller('vote')
export class VoteController {

    constructor(private voteService: VoteService){
    }

    @Get()
    findAll(): Promise<any> {
        return this.voteService.findAll();
    }

    @Get('/:id')
    async findById(
        @Param('id', ValidationPipe) id: ObjectId
    ): Promise<any> {
        return this.voteService.findById(id);
    }
    @Get('username/:username')
    async findOne(
        @Param('username') username: string
    ): Promise<any> {
        return this.voteService.findOne(username);
    }

    @Get("/count/:id")
    async count(
        @Param('id', ValidationPipe) id: ObjectId
    ): Promise<any> {
        return this.voteService.count(id);
    }

    @Post()
    async createVote(@Body() createVoteDto: CreateVoteDto): Promise<any>{
        return this.voteService.create(createVoteDto)
    }

    @Patch('/:id')
    async updateVote(
        @Param('id', ValidationPipe) id: ObjectId,
        @Body() updateVote: UpdateVoteDto
        ): Promise<any>{
        return this.voteService.update(id, updateVote)
    }
}
