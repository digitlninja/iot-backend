import {Test} from '@nestjs/testing';
import {UsersService} from './users.service';
import {AuthService} from './auth/auth.service';
import {UsersRepository} from './users.repository';
import {
    accessTokens,
    authServiceMock,
    codeDeliveryDetails,
    confirmPasswordInput,
    loginUserInput,
    LimitExceededException,
    ExpiredCodeException,
    NotAuthorizedException,
    UsernameExistsException,
    UserNotConfirmedException,
    userRepositoryMock,
    users,
    signUpUserInput
} from "./users-test-types";

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
        it('returns all users if successful', async () => {
            expect.assertions(2);
            const getUsersSpy = jest.spyOn(usersRepository, 'getUsers').mockResolvedValueOnce(users);
            const results = await usersService.getUsers();
            expect(getUsersSpy).toBeCalledTimes(1);
            expect(results).toEqual(users);
        });
        it('returns no users', async () => {
            expect.assertions(2);
            jest.spyOn(usersRepository, 'getUsers').mockResolvedValueOnce([]);
            const results = await usersService.getUsers();
            expect(results).toEqual([]);
        });
    });

    describe('signing up users', () => {
        it('returns created user if successful', async () => {
            expect.assertions(3);
            const createUserSpy = jest.spyOn(usersRepository, 'createUser').mockResolvedValueOnce(users[1]);
            const signUpSpy = (jest.spyOn(authService, 'signUp') as jest.Mock).mockResolvedValueOnce(users[1]);
            const result = await usersService.signUp(signUpUserInput);
            expect(createUserSpy).toBeCalledWith(signUpUserInput);
            expect(signUpSpy).toBeCalledWith(signUpUserInput);
            expect(result).toEqual(users[1]);
        });

        it('throws UsernameExists user', async () => {
            expect.assertions(2);
            const signUpSpy = (jest.spyOn(authService, 'signUp') as jest.Mock).mockRejectedValue(new UsernameExistsException());
            try {
                await usersService.signUp(signUpUserInput);
            } catch (error) {
                expect(signUpSpy).toBeCalledWith(signUpUserInput);
                expect(error.code).toEqual('UsernameExistsException');
            }
        });
        it('throws any Error', async () => {
            expect.assertions(2);
            const signUpSpy = (jest.spyOn(authService, 'signUp') as jest.Mock).mockRejectedValue(new Error());
            try {
                await usersService.signUp(signUpUserInput);
            } catch (error) {
                expect(signUpSpy).toBeCalledWith(signUpUserInput);
                expect(error).toBeTruthy();
            }
        });
    });

    describe('logging in users', () => {
        it('returns access tokens for user if successful', async () => {
            expect.assertions(2);
            const authenticateUserSpy = (jest.spyOn(authService, 'authenticateUser') as jest.Mock).mockResolvedValueOnce(accessTokens);
            const result = await usersService.logIn(loginUserInput);
            expect(authenticateUserSpy).toBeCalledWith(loginUserInput);
            expect(result).toEqual(accessTokens);
        });
        it('throws NotAuthorizedException', async () => {
            expect.assertions(2);
            const authenticateUserSpy = (jest.spyOn(authService, 'authenticateUser') as jest.Mock).mockRejectedValue(new NotAuthorizedException());
            try {
                await usersService.logIn(loginUserInput);
            } catch (error) {
                expect(authenticateUserSpy).toBeCalledWith(loginUserInput);
                expect(error.code).toEqual('NotAuthorizedException');
            }
        });
        it('throws UserNotConfirmedException', async () => {
            expect.assertions(2);
            const authenticateUserSpy = (jest.spyOn(authService, 'authenticateUser') as jest.Mock).mockRejectedValue(new UserNotConfirmedException());
            try {
                await usersService.logIn(loginUserInput);
            } catch (error) {
                expect(authenticateUserSpy).toBeCalledWith(loginUserInput);
                expect(error.code).toEqual('UserNotConfirmedException');
            }
        });
        it('throws any Error', async () => {
            expect.assertions(2);
            const authenticateUserSpy = (jest.spyOn(authService, 'authenticateUser') as jest.Mock).mockRejectedValue(new Error());
            try {
                await usersService.logIn(loginUserInput);
            } catch (error) {
                expect(authenticateUserSpy).toBeCalledWith(loginUserInput);
                expect(error).toBeTruthy();
            }
        });
    });

    describe('forgot password', () => {
        it('returns the email address to where code was delivered if successful', async () => {
            expect.assertions(2);
            const forgotPasswordSpy = (jest.spyOn(authService, 'forgotPassword') as jest.Mock).mockResolvedValueOnce(codeDeliveryDetails);
            const result = await usersService.forgotPassword(signUpUserInput.email);
            expect(forgotPasswordSpy).toBeCalledWith(signUpUserInput.email);
            expect(result.email).toEqual(codeDeliveryDetails.Destination);
        });
        it('throws LimitExceededException', async () => {
            expect.assertions(2);
            const authenticateUserSpy = (jest.spyOn(authService, 'forgotPassword') as jest.Mock).mockRejectedValue(new LimitExceededException());
            try {
                await usersService.forgotPassword(signUpUserInput.email);
            } catch (error) {
                expect(authenticateUserSpy).toBeCalledWith(signUpUserInput.email);
                expect(error.code).toEqual('LimitExceededException');
            }
        });
        it('throws UserNotConfirmedException', async () => {
            expect.assertions(2);
            const forgotPasswordSpy = (jest.spyOn(authService, 'forgotPassword') as jest.Mock).mockRejectedValue(new UserNotConfirmedException());
            try {
                await usersService.forgotPassword(signUpUserInput.email);
            } catch (error) {
                expect(forgotPasswordSpy).toBeCalledWith(signUpUserInput.email);
                expect(error.code).toEqual('UserNotConfirmedException');
            }
        });
        it('throws any Error', async () => {
            expect.assertions(2);
            const forgotPasswordSpy = (jest.spyOn(authService, 'forgotPassword') as jest.Mock).mockRejectedValue(new Error());
            try {
                await usersService.forgotPassword(signUpUserInput.email);
            } catch (error) {
                expect(forgotPasswordSpy).toBeCalledWith(signUpUserInput.email);
                expect(error).toBeTruthy();
            }
        });
    });

    describe('confirm password', () => {
        it('returns the users username if successful', async () => {
            expect.assertions(2);
            const confirmPasswordSpy = (jest.spyOn(authService, 'confirmPassword') as jest.Mock).mockResolvedValueOnce(signUpUserInput.email);
            const result = await usersService.confirmPassword(confirmPasswordInput);
            expect(confirmPasswordSpy).toBeCalledWith(confirmPasswordInput);
            expect(result).toEqual(signUpUserInput.email);
        });
        it('throws LimitExceededException', async () => {
            expect.assertions(2);
            const confirmPasswordSpy = (jest.spyOn(authService, 'confirmPassword') as jest.Mock).mockRejectedValue(new LimitExceededException());
            try {
                await usersService.confirmPassword(confirmPasswordInput);
            } catch (error) {
                expect(confirmPasswordSpy).toBeCalledWith(confirmPasswordInput);
                expect(error.code).toEqual('LimitExceededException');
            }
        });
        it('throws ExpiredCodeException', async () => {
            expect.assertions(2);
            const confirmPasswordSpy = (jest.spyOn(authService, 'confirmPassword') as jest.Mock).mockRejectedValue(new ExpiredCodeException());
            try {
                await usersService.confirmPassword(confirmPasswordInput);
            } catch (error) {
                expect(confirmPasswordSpy).toBeCalledWith(confirmPasswordInput);
                expect(error.code).toEqual('ExpiredCodeException');
            }
        });
        it('throws any Error', async () => {
            expect.assertions(2);
            const confirmPasswordSpy = (jest.spyOn(authService, 'confirmPassword') as jest.Mock).mockRejectedValue(new Error());
            try {
                await usersService.confirmPassword(confirmPasswordInput);
            } catch (error) {
                expect(confirmPasswordSpy).toBeCalledWith(confirmPasswordInput);
                expect(error).toBeTruthy();
            }
        });
    });
});
