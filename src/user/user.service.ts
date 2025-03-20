import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User)
  private createUserDto: Repository<User>,
  ) { }
  async addUser(createUserDto: CreateUserDto) {
    const { email } = createUserDto;
    const existingUser = await this.createUserDto.findOne({ where: { email } });
    if (existingUser) {
      throw new HttpException('User already exists', 400);
    }
    const add = this.createUserDto.create(createUserDto);
    return this.createUserDto.save(add);
  }


  async findAll() {
    return await this.createUserDto.find()
  }

  async findOne(id: string) {
    const find = await this.createUserDto.findOne({ where: { id: id } });
    if (!find) {
      throw new HttpException('User not found', 400);
    }
    return find;
  }


  async findByEmail(email: string) {
    const findEmail= await this.createUserDto.findOne({ where: { email: email } });
    return findEmail
  }

  async update(id, updateUserDto: UpdateUserDto) {
    const update = await this.createUserDto.findOne({ where: { id: id } });
    if (!update) {
      throw new HttpException('User not found', 400);
    }
    const newUpdate = await this.createUserDto.update(id, updateUserDto);
    const updated = await this.createUserDto.findOne({ where: { id } });
    return {
      statusCode: 200,
      message: 'User updated successfully',
      data: updated
    }
  }
  async remove(id: string): Promise<{ message: string }> {
    const result = await this.createUserDto.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Library record with ID ${id} not found`);

    }

    const newresult = await this.createUserDto.delete(id)


    return {
      message: `Library record with ID ${id} deleted successfully`,


    };
  }

}