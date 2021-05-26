import { Poll } from "src/poll/poll.entity";
import { Topic } from "src/topics/topics.entity";
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Option extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    content: string;

    @OneToMany(type=> Poll, poll => poll.option,{ eager: false})
    poll: Poll;

    @ManyToOne(type=> Topic, topic => topic.option,{ eager: false})
    topic: number;
}
