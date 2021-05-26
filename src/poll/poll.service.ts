import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePollDto } from 'src/poll/dto/create-poll.dto';
import { UpdatePollDto } from './dto/update-poll.dto';
import { pollRepository } from './poll.repository';

@Injectable()
export class PollService {
    constructor(
        @InjectRepository(pollRepository)
        private pollRepository: pollRepository,
    ){}

    async getPoll(id: any){
        const topic = this.pollRepository.getPoll(id)
        return topic;
    }


    async getUsername(id: any){
        const topic = this.pollRepository.getUsername(id)
        return topic;
    }
    // async getPollByUsername(id: number, username: string){
    //     const poll = this.pollRepository.getPollByUserName(id, username)
    //     return poll;
    // }

    async createUsername( createPoll: CreatePollDto):Promise<any>{        
        const poll = await this.pollRepository.createUsername(createPoll)
        return poll;
    }

    async createPoll(id : number, createpoll: CreatePollDto):Promise<any>{
        const poll = await this.pollRepository.createPoll(id, createpoll)
        return poll;
    }

    async updatePoll(id: number, name: string, updatePoll: UpdatePollDto):Promise<any>{
        const poll = await this.pollRepository.updatePoll(id, name, updatePoll)
        return poll;
    }

    async deletePoll(id: number):Promise<any>{
        const poll = await this.pollRepository.deletePoll(id)
        return poll;
    }
}
