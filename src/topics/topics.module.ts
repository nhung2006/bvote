import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopicRepository } from './topic.repository';
import { TopicsController } from './topics.controller';
import { TopicsService } from './topics.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([TopicRepository]),       
    ],
    controllers: [TopicsController],
    providers: [TopicsService],
})
export class TopicsModule {
    
}
