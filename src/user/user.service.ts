import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto) {
    throw new Error('Method not implemented.');
  }
  constructor(@InjectRepository(User)
private createUserDto:Repository<User>,
){}
async addUser(createUserDto: CreateUserDto){
  const add = await this.createUserDto.create(createUserDto)
  return this.createUserDto.save(add)
}


  async findAll() {
return await this.createUserDto.find()
  }

  async findOne(id: string) {
  const find = await this.createUserDto.findOne({where: {id:id}});
  if (!find) {
    throw new HttpException('User not found', 400);
  }
return find;
}
 
async findByEmail(email: string){
  return await this.createUserDto.findOne({where: {email:email}});
}

 async update(id, updateUserDto: UpdateUserDto) {
  const update = await this.createUserDto.findOne({where: {id:id}}); 
  if (!update) {
    throw new HttpException('User not found', 400);
  }
  const newUpdate = await this.createUserDto.update(id, updateUserDto);
  const updated = await this.createUserDto.findOne({where: {id}});
  return {
    statusCode: 200,
    message: 'User updated successfully',
    data: updated
  }
 }

  remove(id: string) {
const DeleteAutomobileDto = this.createUserDto.delete(id);
if (!DeleteAutomobileDto) {
  throw new HttpException('User not found', 400);
  }
  return {
    statusCode: 200,
    message: 'User deleted successfully',
  }
}
}