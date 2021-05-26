import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'bson';
import { Model } from 'mongoose';
import { CreateVoteDto } from './dto/create.dto';
import { UpdateVoteDto } from './dto/update.dto';
import { Vote, VoteDocument } from './vote.schema';

@Injectable()
export class VoteService {
    constructor(@InjectModel(Vote.name) private voteModel: Model<VoteDocument>) { }

    async findAll(): Promise<any> {
        const find = this.voteModel.find().exec();
        return find
    }

    async findById(id: ObjectId): Promise<any> {
        const name=new ObjectId(id)

        const find = this.voteModel.findById(name)
        
        
        if(!find){
            throw new BadRequestException(`"${id}" is an invalid object id`)
        }
        return find
    }

    async findOne(username: string): Promise<any> {
        const name=new ObjectId(username)
        const find = this.voteModel.aggregate([{ $match: { username: name } }])
        return find
    }

    async count(id: ObjectId): Promise<any> {
        const find = this.voteModel.aggregate([{$unwind:'$optionId'},{$match: {'topicId': id}},  {$group: {_id: "$optionId", count: { $sum: 1 }}}])
        return find
    }

    async create(createVoteDto: CreateVoteDto): Promise<Vote> {
        const createdVote = new this.voteModel(createVoteDto);
        return createdVote.save();
    }

    async update(id: ObjectId,updateVoteDto: UpdateVoteDto): Promise<any> {
        const find =await this.findById(id)
        const update = find.updateOne(updateVoteDto)
        return update
    }

}
