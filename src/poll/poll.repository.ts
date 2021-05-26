    import { BadRequestException, HttpException, HttpStatus, NotFoundException } from "@nestjs/common";
    import { CreatePollDto } from "src/poll/dto/create-poll.dto";
    import { Option } from "src/option/option.entity";
    import { Topic } from "src/topics/topics.entity";
    import { Connection, EntityRepository, getConnection, getRepository, Repository } from "typeorm";
    import { UpdatePollDto } from "./dto/update-poll.dto";
    import { Poll } from "./poll.entity";


    @EntityRepository(Poll)
    export class pollRepository extends Repository<Poll>{
        async getPoll(id: any):Promise<any>{
            const link = (`http://localhost:3020/poll/`+ id)
            
            const poll = await getRepository(Poll)
            .createQueryBuilder("poll")
            .leftJoinAndSelect("poll.topic", "topic")
            .leftJoinAndSelect("poll.option", "option")

            .select('topic')
            .addSelect('poll')
            .addSelect('option')
            .where("poll.topic = :id", { id: id })
            .getMany();

            const option = await getRepository(Option)
            .createQueryBuilder("option")
            .select('option')
            .where("option.topic = :id", { id: id })
            .getMany();
            
            return {poll, option, link};
        }

        async check(id: any, optionId: number):Promise<any>{
            const poll = await getRepository(Poll)
            .createQueryBuilder("poll")
            .leftJoinAndSelect("poll.topic", "topic")
            .leftJoinAndSelect("poll.option", "option")

            .select('topic')
            .addSelect('poll')
            .addSelect('option')
            .select('topic.content')
            .addSelect('poll')
            .addSelect('option.content')
            .where('topic.link = :id', { id: id })
            .where("poll.topic = :id", { id: id })
            .getMany();

            const option = await getRepository(Option)
            .createQueryBuilder("option")
            .select('option')
            .where("option.topic = :id", { id: id })
            .getMany();
            
            return {poll, option};
        }

        async getUsername(id: any):Promise<any>{
            
            const poll = await getRepository(Poll)
            .createQueryBuilder("poll")
            .leftJoinAndSelect("poll.topic", "topic")
            .leftJoinAndSelect("poll.option", "option")

            .select('poll.username')
            .groupBy('poll.username')
            .where("poll.topic = :id", { id: id })
            .getMany();
            return poll;
        }

        async getPollByUserName(id:number, username: string):Promise<any>{
            const poll = await getRepository(Poll)
            .createQueryBuilder("poll")
            .leftJoinAndSelect("poll.topic", "topic")
            .select('poll')
            .addSelect('topic.id')
            .where("poll.topicId = :id", { id: id })
            .andWhere("poll.username = :name", { name: username })
            .getMany();
        }

        async getTopic():Promise<any>{
            const Topic = await getRepository(Poll)
        }

        async createUsername( createPoll: CreatePollDto):Promise<any>{
 
            const {username, topicId} = createPoll;

            const found = await this.getPollByUserName(topicId, username)
            
            if(!found){
                const poll = new Poll();
                poll.username = username;        
                poll.topic = topicId;
                poll.save();
                return new HttpException('Success', HttpStatus.CREATED);
            }
            else {
                return new HttpException('Username already exists', HttpStatus.BAD_REQUEST);
            }
        
        } 
        async createPoll(id: number, createpoll: CreatePollDto):Promise<any>{
            const config = await getRepository(Topic)
            .createQueryBuilder("topic")
            .select('topic.expires_date')
            .where("topic.id = :id", { id: id })
            .getMany();
            const {username, topicId, optionId} = createpoll;
            const poll = new Poll();
            poll.username = username;
            poll.topic = topicId;
            poll.option = optionId;
            poll.vote = false;
            poll.save();
        }  

        async updatePoll(id: number, name: string, updatepoll: UpdatePollDto):Promise<any>{
            const {username, optionId} = updatepoll;
            const poll = await getRepository(Poll)
            .createQueryBuilder("poll")
            .leftJoinAndSelect("poll.topic", "topic")
            .leftJoinAndSelect("poll.option", "option")
            .select('poll')
            .addSelect('topic.id')
            .addSelect('option.id')
            .where("poll.topicId = :id", { id: id })
            .andWhere("poll.username = :name", { name: name })
            .getOne();
            return (poll);
        } 

        async deletePoll(id: number):Promise<any>{
            const found = await this.delete(id);
            if(found.affected === 0){
                throw new NotFoundException(`id '${id}' not found`);
            }
        }
    }