import { generateString } from "@nestjs/typeorm";
import { ResultDto } from "src/dto/result.dto";
import { EntityRepository, getConnection, getRepository, Repository } from "typeorm";
import { CreateTopicDto } from "./create-topic.dto";
import { Topic } from "./topics.entity";

@EntityRepository(Topic)
export class TopicRepository extends Repository<Topic>{
    async getTopic():Promise<any>{
        // const topic = this.createQueryBuilder('topic').getMany();
        const topic  = await getRepository(Topic)
        .createQueryBuilder("topic")
        .select('topic')
        .getMany();
        return topic;
    }

    async createTopic(createTopic: CreateTopicDto):Promise<any>{
        // const {content} = createTopic;
        // const topic = new Topic();
        // topic.content = content;
        // topic.save();
        // .leftJoinAndSelect("topic.poll", "poll", 'poll.topicId = topic.id')
        const link = generateString();        
        console.log('createTopic', createTopic);
        
        const topic  = (await getConnection()
                        .createQueryBuilder().insert().into(Topic).values([{content: createTopic.content, link: link, expires_date: createTopic.expire_date}])
                        .printSql()
                        .execute()).identifiers 
        
        return topic
        
    }

    async result(resultDto: ResultDto):Promise<any>{
        // SELECT * , COUNT(optionId) FROM `poll` WHERE topicId = 1 GROUP BY optionId
        // SELECT topic.name , COUNT(optionId) FROM `poll`, topic WHERE topic.id = poll.topicId and topicId = 1 GROUP BY optionId
        // SELECT topic.name, `option`.`name` , COUNT(optionId) FROM `poll`, topic, `option` WHERE topic.id = poll.topicId AND `option`.id = poll.optionId AND topicId = 1 GROUP BY optionId

        let  result = ('SELECT topic.name, op.name , COUNT(optionId) FROM poll, topic, `option` as op WHERE topic.id = poll.topicId AND op.id = poll.optionId AND topicId =') +  (`${resultDto}`) + (' GROUP BY optionId');
        return this.query(result);
    }
}