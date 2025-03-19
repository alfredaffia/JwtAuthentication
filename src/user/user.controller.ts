import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Post('post')
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

  @Put(':id')
  update(@Param('id') id: string, @Body() updateAutomobileDto: UpdateUserDto) {
    return this.UserService.update(+id, updateAutomobileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.UserService.remove(id);
  }
}
