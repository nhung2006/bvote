import { IsEmpty } from "class-validator";
import { Option } from "src/option/option.entity";
import { Poll } from "src/poll/poll.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Topic extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number

    @Column()    
    link: string

    @Column()
    content: string

    @Column({ nullable: true})
    expires_date: string

    @CreateDateColumn()
    created_at: Date;
 
    @UpdateDateColumn()
    updated_at: Date;
    
    @OneToMany(type=> Poll, poll => poll.topic)
    poll: Poll

    @OneToMany(type=> Option, option => option.topic)
    option: Option
}
