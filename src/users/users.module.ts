import { Module, CacheModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { UsersRepository } from './users.repository';
import { UserSchema } from './users.schema';
import { AuthService } from './auth/auth.service';
import { AuthConfig } from './auth/auth.config';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
        CacheModule.register(),
    ],
    providers: [
        UsersService,
        UsersRepository,
        UsersResolver,
        AuthService,
        AuthConfig,
    ],
})
export class UsersModule {
}
