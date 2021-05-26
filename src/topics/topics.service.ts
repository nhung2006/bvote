import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTopicDto } from 'src/topics/create-topic.dto';
import { ResultDto } from 'src/dto/result.dto';
import { TopicRepository } from "./topic.repository";

@Injectable()
export class TopicsService {
    constructor(
        @InjectRepository(TopicRepository)
        private topicRepository: TopicRepository,
    ){}

    async getTopic():Promise<any>{
        const topic = await this.topicRepository.getTopic()
        return topic
    }

    async getTopicById(id: number):Promise<any>{
        const topic = await this.topicRepository.findOne(id)
        return topic
    }

    async createTopic(createTopic: CreateTopicDto):Promise<any>{
        return await this.topicRepository.createTopic(createTopic);
    }

    async result(resultDto: ResultDto):Promise<any>{
        return await this.topicRepository.result(resultDto)
    }
}
