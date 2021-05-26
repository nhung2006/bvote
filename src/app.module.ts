import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';;
import { TopicsModule } from './topics/topics.module';
import { PollModule } from './poll/poll.module';
import { OptionModule } from './option/option.module';
import { MongooseModule } from '@nestjs/mongoose';
import { VoteModule } from './vote/vote.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    MongooseModule.forRoot('mongodb://localhost/project'),
    TopicsModule,
    PollModule,
    OptionModule,
    VoteModule,
    AuthModule
  ],
})
export class AppModule {}
