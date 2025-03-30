import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Post('signup')
  create(@Body() createUserDto: CreateUserDto) {
    
    return this.UserService.addUser(createUserDto);
  }

  @Get()
 async findAll() {
    return await this.UserService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.UserService.findOne(id);
  }


  @Put('block/:id')
async blockUser(@Param('id') UserId:string, @Body('block') block: boolean) {
  return this.UserService.blockUser(String(UserId), block);
}
  
@Put(':id')
async update(@Param('id') id: number, @Body() updateData: Partial<User>) {
  return  await this.UserService.update(id, updateData);
}




  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.UserService.remove(id);
  }
}
