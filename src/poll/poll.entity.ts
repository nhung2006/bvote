import { Option } from "src/option/option.entity";
import { Topic } from "src/topics/topics.entity";
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Poll extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    username: string;

    @Column({nullable: true})
    vote: boolean;
    
    @ManyToOne(type=> Topic, topic => topic.poll)
    topic: Number;

    @ManyToOne(type=> Option, option => option.poll)
    option: number;
    
}
