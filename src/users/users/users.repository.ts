import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/graphql';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserModel } from './users.schema';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel('User') private userModel: Model<UserModel>) {}

  async createUser(creatUserDTO: CreateUserDto): Promise<User> {
    const user = new this.userModel(creatUserDTO);
    return user.save();
  }
}
