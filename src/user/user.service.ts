import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User)
  private createUserDto: Repository<User>,
    private jwtService: JwtService,
  ) { }
  async addUser(createUserDto: CreateUserDto) {
    const { email } = createUserDto;

    const existingUser = await this.createUserDto.findOne({ where: { email } });

    if (existingUser) {
      throw new HttpException('User already exists', 400);
    }

    const payload = { email: 'user.email', sub: 'user.id', username: 'user.username' };

    const add = this.createUserDto.create(createUserDto);

    return {
      user: await this.createUserDto.save(add),
      access_token: this.jwtService.sign(payload)
    };
  }


  async findAll() {
    return await this.createUserDto.find()
  }

  async findOne(id: string) {
    const find = await this.createUserDto.findOne({ where: { id: id } });

    if (!find) {
      throw new HttpException('User not found', 400)
    };

    return find;
  }


  async findByEmail(email: string) {
    const findEmail = await this.createUserDto.findOne({ where: { email: email } });

    return findEmail
  }
  // async findByPassword(password: string) {
  //   const findPassword = await this.createUserDto.findOne({ where: { password: password } });
  //   return findPassword
  // }
  async blockUser(UserId: string, isBlocked: boolean) {
    const user = await this.createUserDto.findOne({ where: { id: UserId } });
    if (!user) {
      throw new NotFoundException('User not found');
    };

    user.isBlocked = isBlocked;
    return this.createUserDto.save(user);
  }


  async update(id, updatedata: Partial<User>) {
    const updateuser = await this.createUserDto.findOne({ where: { id } });

    if (!updateuser) {
      throw new NotFoundException(`user with ID ${id} not found`);
    }

    // const newupdate = await this.createUserDto.update(id,updateuser);
    // const updated = await this.createUserDto.findOne({ where: { id } })

    const update = await this.createUserDto.update(id, updateuser)
    return {
      statuscode: 200,
      message: 'user succesfully updated',
      data: update
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