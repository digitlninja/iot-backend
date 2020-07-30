import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, SignUpInput } from 'src/graphql';
import { UserModel } from './users.schema';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel('User') private userModel: Model<UserModel>) {}

  async getUsers(): Promise<User[]> {
    return this.userModel.find();
  }

  async createUser(user: SignUpInput): Promise<User> {
    const newUser = new this.userModel({ user });
    return (await newUser.save()).toObject();
  }
}
