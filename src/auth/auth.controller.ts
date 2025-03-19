import { Body, Controller, PayloadTooLargeException, Post } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { Any } from 'typeorm';

@Controller('auth')
export class AuthController {
    constructor(private userService: UserService,
private AuthService: AuthService
    ) {}
    @Post('login')
   async login(@Body() loginDto:any) {
        const user = await this.userService.findByEmail(loginDto.email);
        if(user) {
 if(user.password === loginDto.password && user.email === loginDto.email) {
       return this.AuthService.login(user);
 }
 return 'incorrect password or email';
        }
        return' unauthenticated'
    }
}
