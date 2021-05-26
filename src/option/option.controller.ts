import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreateOptionDto } from 'src/dto/create-option.dto';
import { OptionService } from './option.service';

@Controller('option')
export class OptionController {
    constructor(private optionService: OptionService){
    }

    @Get('/:id')
    getOption(
        @Param('id' ,ParseIntPipe) id: number
    ):Promise<any>{
        return this.optionService.getOption(id);
    }
    @Get('/:id/:option_id')
    getOptionInPoll(
        @Param('id' ,ParseIntPipe) id: number,
        @Param('option_id' ,ParseIntPipe) option_id: number

    ):Promise<any>{
        return this.optionService.getOptionInPoll(id, option_id);
    }
    @Post()
    createOption(
        @Body() createOptionDto: CreateOptionDto
    ):Promise<any>{
        return this.optionService.createOption(createOptionDto);
    }

    @Delete('/:id')
    deleteOption(
        @Param('id', ParseIntPipe)id: number
    ):Promise<any>{
        return this.optionService.deleteOption(id);
    }
}
