import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Render, Res, UseFilters, ValidationPipe } from '@nestjs/common';
import { CreatePollDto } from 'src/poll/dto/create-poll.dto';
import { UpdatePollDto } from './dto/update-poll.dto';
import { PollService } from './poll.service';

@Controller('poll')
export class PollController {
    constructor(private pollService: PollService){
    }

    @Get('/:id')
    getPoll(@Param('id', ParseIntPipe) id: number):Promise<any>{
        return this.pollService.getPoll(id)
    }

    @Get('username/:id')
    getUsernaem(@Param('id', ParseIntPipe) id: number):Promise<any>{
        return this.pollService.getUsername(id)
    }
    
    // @Get('/:id/:username')
    // async getPollByUsername(
    //     @Param('id', ParseIntPipe) id: number,
    //     @Param('username') username: string):Promise<any>{
    //     return this.pollService.getPollByUsername(id, username)
    // }

    @UseFilters()
    @Post('/username')
    createUsername(
        @Body() createPoll: CreatePollDto,
    ):Promise<any>{
        return this.pollService.createUsername(createPoll);
    }

    @Post('/:id')
    async createPoll(
        @Param('id', ParseIntPipe) id: number,
        @Body() createPoll: CreatePollDto
    ):Promise<any>{
        return this.pollService.createPoll(id, createPoll);
    }

    @Patch('/:id/:name')
    async updatePoll(
        @Param('id', ParseIntPipe) id: number,
        @Param('name') name: string,
        @Body()updatePoll: UpdatePollDto
    ): Promise<any>{
        return this.pollService.updatePoll(id,name, updatePoll)
    }

    @Delete('/:id')
    deleteOption(
        @Param('id', ParseIntPipe)id: number
    ):Promise<any>{
        return this.pollService.deletePoll(id);
    }
}