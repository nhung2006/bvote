import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, Render } from '@nestjs/common';
import { CreateTopicDto } from 'src/topics/create-topic.dto';
import { ResultDto } from 'src/dto/result.dto';
import { TopicsService } from './topics.service';

@Controller('topic')
export class TopicsController {
    constructor(private topicService: TopicsService){
    }
    
    @Get('/:id')
    getTopicById(
        @Param('id', ParseIntPipe) id: number
    ):Promise<any>{
        return this.topicService.getTopicById(id)
    }

    @Post()
    createTopic(
        @Body() createTopic: CreateTopicDto
    ):Promise<any>{
        return this.topicService.createTopic(createTopic);
    }
}
