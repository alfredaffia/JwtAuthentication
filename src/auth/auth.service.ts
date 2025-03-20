import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private userService: UserService,
         private jwtService: JwtService,
    
    ) { }

    async validateUser(
        email: string, 
        password: string,)
         {
        const user = await this.userService.findByEmail(email);
        if (user && user.password === password) {
            return user;
        }
        return null
    }
async login(login: CreateUserDto){
    const{email, password} =login
    const user = await this.userService.findByEmail(email)
    if(!user){
        throw new HttpException('input valid email',404)
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        throw new HttpException('invalid password',404)
    }
    const payload = { email: 'user.email', sub: 'user.id', username: 'user.username' };
    return {
        userDetails:user,
        access_token: this.jwtService.sign(payload)
    }
}

}
