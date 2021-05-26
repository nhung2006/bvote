import { NotFoundException } from "@nestjs/common";
import { CreateOptionDto } from "src/dto/create-option.dto";
import { Poll } from "src/poll/poll.entity";
import { Topic } from "src/topics/topics.entity";
import { EntityRepository, getRepository, Repository } from "typeorm";
import { Option } from "./option.entity";

@EntityRepository(Option)
export class OptionRepository extends Repository<Option>{
    
    async getOption(id: number):Promise<any>{
        const option = await getRepository(Option)
        .createQueryBuilder("option")
        .leftJoinAndSelect("option.topic", "topic")
        .select('topic')
        .addSelect('option.id')
        .addSelect('option.content')
        .where("topic.id = :id", { id: id })
        .getMany();
        return option;
        
    }
    async getOptionInPoll(id: number, option_id):Promise<any>{
        const option = await getRepository(Poll)
        .createQueryBuilder("poll")
        .leftJoinAndSelect("poll.topic", "topic")
        .leftJoinAndSelect("poll.option", "option")
        .select('topic.content')
        .addSelect('option.id')
        .addSelect('option.content')
        .addSelect('poll')
        .where("poll.topic = :id", { id: id })
        .andWhere("poll.option = :option_id", { option_id: option_id })
        .getMany();
        return option;
        
    }
    async createOption(createOption: CreateOptionDto):Promise<any>{
        const {content, topicId} = createOption;
        const option = new Option();
        option.content = content;
        option.topic = topicId;
        option.save();
        return option
        
    }    

    async deleteOption(id: number):Promise<any>{
        const found = await this.delete(id);
        if(found.affected === 0){
            throw new NotFoundException(`id '${id}' not found`);
        }
    }  
}