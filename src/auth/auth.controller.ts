import { Body, Controller, HttpException, PayloadTooLargeException, Post } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';


@Controller('auth')
export class AuthController {
       constructor(private userService: UserService,
              private AuthService: AuthService
       ) { }
       @Post('login')
       async login(@Body()login:CreateUserDto) {
       return await this.AuthService.login(login)
           
       }
}
