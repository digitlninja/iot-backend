import {CodeDeliveryDetails} from "amazon-cognito-identity-js";

export const signUpUserInput = {
    firstName: 'Darth',
    lastName: 'Vader',
    username: 'vader',
    password: 'j01nTh3D4rk!',
    email: 'vader.example@empirehq.com',
    customer: '728o0r0p',
};

export const loginUserInput = {
    username: 'vader',
    password: 'j01nTh3D4rk!',
    redirectUrl: ''
};

export const users = [
    {
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
        email: 'darthVaderexample@gmail.com',
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

export const accessTokens = {
    "idToken": "eyJraWQiOiJJakY0bnRnNjh0bGxDdlJMT1Q4Q21rNG91SFFOcTBtQVRIa2RvNXBROFI0PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJkMGJjODI0Yi1iZGE5LTQ4YWQtOWNjOS01Zjc3N2JiODQ1OTIiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMi5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTJfUmlYcXRpR0YxIiwiY29nbml0bzp1c2VybmFtZSI6IjEyMyIsImdpdmVuX25hbWUiOiJXaWxsaWFtIiwiYXVkIjoiNXJqMmkzZjRhbzM0aGNja29iYmxyNjFzaWsiLCJldmVudF9pZCI6IjRiNDM1ZDliLTJmMjYtNDg2My1hZjBiLWQyYTJhMmExZDk4MSIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNTk4NzE3MzY2LCJleHAiOjE1OTg3MjA5NjYsImlhdCI6MTU5ODcxNzM2NiwiZmFtaWx5X25hbWUiOiJMYW5nIiwiZW1haWwiOiJ3aWxsaWFtKzEyM0B0aHJlZXNwcmludHMuY29tIn0.XP7zO8cmZoYT-pfIF1MZ_04ywzNi86PxWb4UpufYLigW3U1A5aJfAH6jqdeX0hW_N9QfmGBE30LcUWGHluyalVgqUxP8ONRa47OKDfx5W4wKU7LVDhffWAyPZoJCPpm8HOSqSr3s46dD8zNqv_etWYGc1HFv16F0oi0v1RhcVCuCtYY10PzPEvSfob6eMZM91rFLfGSyI6OsmllVmjWq2TNnKPDKEuXJK8q3Dk9hMIibQ3szeBYNYKeWPD0y-Gb4WktxuJYCCHGMchQZad1Buyh271IfMNmjiH9KPFGyh3i2Ip9gKOgTMg3BrzD9NGsYhq2t0oKa3y6vQfyzo7qYvA",
    "accessToken": "eyJraWQiOiI1eDlvZ2s3UGZ1VVZQODEzaTFVa21jdGxZWTUwREt1SzZKa0dNUjQ4ZDZ3PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJkMGJjODI0Yi1iZGE5LTQ4YWQtOWNjOS01Zjc3N2JiODQ1OTIiLCJldmVudF9pZCI6IjRiNDM1ZDliLTJmMjYtNDg2My1hZjBiLWQyYTJhMmExZDk4MSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE1OTg3MTczNjYsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS13ZXN0LTIuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0yX1JpWHF0aUdGMSIsImV4cCI6MTU5ODcyMDk2NiwiaWF0IjoxNTk4NzE3MzY2LCJqdGkiOiJiZWNlZDUxOS02OThjLTQ1NDctOTEwYi0yMGZiM2RlODllN2YiLCJjbGllbnRfaWQiOiI1cmoyaTNmNGFvMzRoY2Nrb2JibHI2MXNpayIsInVzZXJuYW1lIjoiMTIzIn0.WQLJCPXNmfcVAF0PwmA8YaKk3EEcJoqoM8HTRl-XFu8vfNhnpO52Wo-OTmSF9eoI8dFTsRg9wZ4EDImddz1iLtRzqOq20DEiSbWFAnUqHeO0dZGwaNHcJdlu3biHwtMw9j1kPwmLiLoz-_OOHZMoRYH7M9nXm14LYElOtz_MzNQC5Nd-nTGO1OZjpXLP94U1Y6FAGvgv7sacRTzxFYm7OV-fRmzHbOvOp2dTT61bVU7cE_tmHLSEjmLrz7MlBSHAqiMvBNdCsJwm2o4AK7Vbp3TYBVci4IyunyfZXfI2hB514dkigS4Z0eVvzqEQhe8fZ-yzRFH3Qx6_jc3KwIVLoQ",
    "refreshToken": "eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.FEdFYjkOC_DEPejai_-Ukh84HXlm06nuPkRZsj0H2ppgAJK7SNNYqdhN6ieaK5d0cX7x-zEk0qsPEgVwKAUtLQTdkjIAkZpeC7F6VALDBcUrzgFZkeG-UiBIAJ87eg2qaY7y7J3G_vY30l6Imo9ZIqn1EXMYF5vT2eK7OFFISjflIZBHGxVPTVISlDTxLieGMN3vpwIBqg1_uC3RUpuntaXdxAHBuI2mi8P2schbWbWOSbDFgxtZtfZ2qL86tvc_P3o-Xc7H5vM86_drg3nbv7LJs5n1NqmZ9MOx9S3WXQhyOOXzA0r5-8rJsc34SeW-MWNkLboRMbxV49aH6AU1HA.jXy_F5R6N_FVhtza.rVOs6VLsQ8pNuu13o2g9duS9qhGNGkVSpArF4D5NVFCyRkxPPor_CkZTGUVC9A41a_FXPWe5Bn9NY-nhOwTxXQBKiuLOmFBDLE8iEEkbUOp2f5vL1sTm8BsyVNT_SsafeztGbRWA5zl9KdcmlANeJ4w4fEo4a1S_mBLJmDN8MsPDFp_iVGgUWeMlAwt4q9P5iZID5vzAT196yZn9mGVNjliMcJl_-zgLTP2Ks0RCpw66-DRzYAbR-W-Dgh77IfzsCPpvCxahLh_uHyHivXqm8jh8LtyR8aQszdJG5cNGWYrMj4ozKAIpuinOx1MVCvtba_zaopZ-1MFrB81Vfi-8gswX6WzlVMj2eEUpBLXKuluBUUzK_vXECWerntQWsqJQ7ftEGVhUmZIorV83Iew1yWij68vcO6qQD-RtYqxFWYzKvfhMB_lGu-_kYi2ILtCf6YJNbdVvz54ZX7xCyicbJtZ9X2ZShjGyKNbko5jbIXUUPxPVOWVEtN1A9DNYlq9ONy5zwVtNnorK8L3S0hyUdZ-r85fNUt73ASqOSIVrfIQ4CmzTiqiC1BolE7y-NW8fPQ9xOI7nwX9CTMmHHKtrG1ItAyBv3y1_lnVamrNaRaDcW8obOTikpNN4JDXkhK4MIHahgq_-DwVxL54Bbft5tGrlfVntiPZOFbyHYw7ZiahijwY4s25IiDVgWyK4tpXGHDa4y3rIjNJ_VYL7F32vKvGKWU_lcGvyp-PShAYxnhEg-qtKZTZ2iP10VXVpc9-Mft4g3Zq3xIIb-HCW7KbnxE3kYkqoaQuuihm44KwflD7OjqY65Tva4nF1UbKQfdGCQFNXzRsJd9Pb2bcQ0EwRpWShy_Fr3xRN-iCyDujr-4ddVV6iktJjjuWNDkmFY9RIrpEqOCdmh_BxSxH4TXvbnA2Vck_o5lR1gz5pHNYyIPShPQ3oHzP-3kG2ekGxTGPFy6g_zH4owYv4FSpK1qNAc29E90K9iSARHvJJiaBOtDI-vPv8bbM7aeINXpROTuLeCxw1KcDZsgaywzHJKtDKwyteoMqfVm0gZ1otSwcyuSLJAThCxFaFVkyF9W4oxt0I78We72gXpTqniBQKDcLhGGuXNKo3ZLH0wn2AmWFOCyxXQ7XqDMmKHq6uY9oXqmWmcEwY7nR5hXWNZzZYLs1mK05niWW3dcX4MCkXXLLAKBDHFYijktChabiZMTZe8mgj5RiMZvb9_5RSmveVG27IWc4ng1KQXtrZSyGAIG1TMFCMpz4KiAS7QAenWyC3Q_w.MIZ1a-KJCAy20ZXTFuyH-Q",
};

export const userRepositoryMock = {
    createUser: jest.fn(),
    getUsers: jest.fn(),
};

export const confirmPasswordInput = {
    username: signUpUserInput.email,
    verificationCode: "83298",
    newPassword: "IAmYourFather66!"
};

export const authServiceMock = {
    signUp: jest.fn(),
    authenticateUser: jest.fn(),
    forgotPassword: jest.fn(),
    confirmPassword: jest.fn(),
    refreshUserTokens: jest.fn(),
};


export const codeDeliveryDetails: CodeDeliveryDetails = {
    AttributeName: 'TestAttribute',
    DeliveryMedium: 'email',
    Destination: 'test@example.com'
};


export class UsernameExistsException extends Error {
    code: string;

    constructor() {
        super('User already exists.');
        this.name = 'UsernameExistsException';
        this.code = 'UsernameExistsException';
    }
}

export class NotAuthorizedException extends Error {
    code: string;

    constructor() {
        super('Password attempts exceeded.');
        this.name = 'NotAuthorizedException';
        this.code = 'NotAuthorizedException';
    }
}

export class UserNotConfirmedException extends Error {
    code: string;

    constructor() {
        super('User is not confirmed.');
        this.name = 'UserNotConfirmedException';
        this.code = 'UserNotConfirmedException';
    }
}

export class LimitExceededException extends Error {
    code: string;

    constructor() {
        super('Attempt limit exceeded, please try after some time.');
        this.name = 'LimitExceededException';
        this.code = 'LimitExceededException';
    }
}

export class ExpiredCodeException extends Error {
    code: string;

    constructor() {
        super('Attempt limit exceeded, please try after some time.');
        this.name = 'ExpiredCodeException';
        this.code = 'ExpiredCodeException';
    }
}