import { Controller, Post, Body, ValidationPipe, UseGuards, Req, Get, Patch, UseInterceptors, UploadedFile, UploadedFiles, UsePipes, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { Admin } from './admin.entity';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import{ UpdateAuthDto } from './dto/update-auth.dto'
import { GetUser } from './get-admin.decoator';


@Controller('auth')

export class AuthController {
    constructor(
        private authService: AuthService,
    ){}
    
    @Post('/signup')
    async signUp(@Body(ValidationPipe) authDto: AuthDto):Promise<any>{
        return this.authService.singUp(authDto);
    }

    @Post('/signin')
    async signIn(@Body(ValidationPipe) authDto: AuthDto): Promise<{accessToken: string}>{
        return this.authService.singIn(authDto);
    }


    @Get('/info')
    @UseGuards(AuthGuard())
    async GetInfo(@GetUser() admin:  Admin):Promise<Admin>{   
        return this.authService.getInfo(admin)
    }

    @Get('/info/:id')
    @UseGuards(AuthGuard())
    async GetInfoById(id: number):Promise<Admin>{   
        return this.authService.getInfoFriend(id)
    }

    @Patch('/update')
    @UseGuards(AuthGuard())
    async updateInfo(@GetUser() admin:  Admin,
        @Body()  updateAuthDto: UpdateAuthDto
    ): Promise<Admin>{
        return this.authService.updateInfo(admin, updateAuthDto)
    }

    @Patch('upload')
    @UseGuards(AuthGuard())
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(
        @GetUser() admin:  Admin,
        @UploadedFile() file
    ):Promise<Admin> {
        return this.authService.uploadImg(admin,file.filename)
    }
}
