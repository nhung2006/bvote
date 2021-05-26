import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOptionDto } from 'src/dto/create-option.dto';
import { getRepository } from 'typeorm';
import { OptionRepository } from './option.repository';


@Injectable()
export class OptionService {
    constructor(
        @InjectRepository(OptionRepository)
        private optionRepository: OptionRepository,
    ){}
    async getOption(id: number):Promise<any>{
        const option = await this.optionRepository.getOption(id)
        return option
    }

    async getOptionInPoll(id: number,option_id: number ):Promise<any>{
        const option = await this.optionRepository.getOptionInPoll(id, option_id)
        return option
    }

    async createOption(createOptionDto: CreateOptionDto):Promise<any>{
        const option = await this.optionRepository.createOption(createOptionDto)
        return option;
    }


    async deleteOption(id: number):Promise<any>{
        const option = await this.optionRepository.deleteOption(id)
        return option;
    }
}
