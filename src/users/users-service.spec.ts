import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';
import { AuthService } from './auth/auth.service';
import { UsersRepository } from './users.repository';

const signUpUser = {
    firstName: 'Darth',
    lastName: 'Vader',
    username: 'vader',
    password: 'j01nTh3D4rk!',
    email: 'darthMaulexample@gmail.com',
    customer: '728o0r0p',
};
const users = [{
    _id: '53d53d2s',
    firstName: 'Anakin',
    lastName: 'Skywalker',
    username: 'anakin88',
    email: 'anakin88example@gmail.com',
    customer: '92t89t3h',
}, {
    _id: '28d53d9z',
    firstName: 'Darth',
    lastName: 'Vader',
    username: 'vader',
    password: 'j01nTh3D4rk!',
    email: 'darthMaulexample@gmail.com',
    customer: '728o0r0p',
},
    {
        _id: '53d53d2s',
        firstName: 'Darth',
        lastName: 'Maul',
        username: 'darthMaul',
        email: 'darthMaulexample@gmail.com',
        customer: '17t17t3j',
    },
];
const userRepositoryMock = {
    createUser: jest.fn(),
    getUsers: jest.fn(),
};
const authServiceMock = {
    signUp: jest.fn(),
    authenticateUser: jest.fn(),
    forgotPassword: jest.fn(),
    confirmPassword: jest.fn(),
    refreshUserTokens: jest.fn(),
};

class UsernameExistsException extends Error {
    code: string;

    constructor() {
        super('User already exists.');
        this.name = 'UsernameExistsException';
        this.code = 'UsernameExistsException';
    }
}

describe('UsersService', () => {
    let usersService: UsersService;
    let usersRepository: UsersRepository;
    let authService: AuthService;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                UsersService,
                {
                    provide: UsersRepository,
                    useValue: userRepositoryMock,
                },
                {
                    provide: AuthService,
                    useValue: authServiceMock,
                }],
        }).compile();
        usersService = module.get(UsersService);
        usersRepository = module.get(UsersRepository);
        authService = module.get(AuthService);
    });
    describe('getting all users', () => {
        it('it returns all users', async () => {
            expect.assertions(2);
            const getUsersSpy = jest.spyOn(usersRepository, 'getUsers').mockResolvedValueOnce(users);
            const results = await usersService.getUsers();
            expect(getUsersSpy).toBeCalledTimes(1);
            expect(results).toEqual(users);
        });
        it('it returns no users', async () => {
            expect.assertions(2);
            const getUsersSpy = jest.spyOn(usersRepository, 'getUsers').mockResolvedValueOnce([]);
            const results = await usersService.getUsers();
            expect(getUsersSpy).toBeCalledTimes(1);
            expect(results).toBe([]);
        });
    });
    describe('signing up users', () => {
        it('it returns created user', async () => {
            expect.assertions(3);
            const createUserSpy = jest.spyOn(usersRepository, 'createUser').mockResolvedValueOnce(users[1]);
            const signUpSpy = (jest.spyOn(authService, 'signUp') as jest.Mock).mockResolvedValueOnce(users[1]);
            const results = await usersService.signUp(signUpUser);
            expect(createUserSpy).toBeCalledWith(signUpUser);
            expect(signUpSpy).toBeCalledWith(signUpUser);
            expect(results).toEqual(users[1]);
        });
        it('it returns UsernameExists user when trying to create a user with a duplicate username', async () => {
            expect.assertions(2);
            const signUpSpy = (jest.spyOn(authService, 'signUp') as jest.Mock).mockRejectedValue(users[1]); //
            try {
                await usersService.signUp(signUpUser);
            } catch (error) {
                expect(error.code).toEqual('UsernameExistsException');
                expect(signUpSpy).toBeCalledWith(signUpUser);
            }
        });
    });
});