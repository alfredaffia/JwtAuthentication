import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
        @IsNotEmpty()
        @IsString()
        username: string;
    
    
        @IsEmail()
        email: string;
    
        @IsNotEmpty()
        @IsString()
        password: string;
}
