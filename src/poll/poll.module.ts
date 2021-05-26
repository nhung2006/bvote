import { Module } from '@nestjs/common';
import { PollService } from './poll.service';
import { PollController } from './poll.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { pollRepository } from './poll.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([pollRepository]),       
    ],
    providers: [PollService],
    controllers: [PollController]
})
export class PollModule {}
