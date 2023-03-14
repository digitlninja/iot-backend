import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { CanActivate, INestApplication } from '@nestjs/common';
import { AppModule } from "../app.module";
import { User } from "../graphql";
import { AuthGuard } from "./auth/auth.guard";

const fakeGuard: CanActivate = { canActivate: () => true };
const testUsers: User[] = [
    {
        email: "william+e2e1@threesprints.com",
        username: "E2D2",
        firstName: "E2D2",
        lastName: "Skywalker"
    },
    {
        email: "william+e2e2@threesprints.com",
        username: "E2D3",
        firstName: "E2D3",
        lastName: "Skywalker"
    },
    {
        email: "william+e2e4@threesprints.com",
        username: "E2D4",
        firstName: "E2D4",
        lastName: "Skywalker"
    }
];

const gql = '/graphql';

describe('AppController (e2e)', () => {
    let app: INestApplication;
    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).overrideGuard(AuthGuard).useValue(fakeGuard).compile();

        app = module.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    describe(gql, () => {
        describe('users', () => {
            it('should get users', () => {
                return request(app.getHttpServer())
                    .post(gql)
                    .send({ query: '{users { email } }' })
                    .expect(200)
                    .expect((res) => {
                        console.log({ res })
                        expect(res.body.data.getCats).toEqual(expect.arrayContaining(testUsers));
                    });
            });
            // describe('one cat', () => {
            //     it('should get a single cat', () => {
            //         return request(app.getHttpServer())
            //             .post(gql)
            //             .send({ query: '{getCat(catId:{id:"2"}){id name age breed}}' })
            //             .expect(200)
            //             .expect((res) => {
            //                 expect(res.body.data.getCat).toEqual({
            //                     name: 'Terra',
            //                     age: 5,
            //                     breed: 'Siberian',
            //                     id: '2',
            //                 });
            //             });
            //     });
            //     it('should get an error for bad id', () => {
            //         return request(app.getHttpServer())
            //             .post(gql)
            //             .send({ query: '{getCat(catId: {id:"500"}){id name age breed}}' })
            //             .expect(200)
            //             .expect((res) => {
            //                 expect(res.body.data).toBe(null);
            //                 expect(res.body.errors[0].message).toBe(
            //                     'No cat with id 500 found',
            //                 );
            //             });
            //     });
            // });
            // it('should create a new cat and have it added to the array', () => {
            //     return (
            //         request(app.getHttpServer())
            //             .post(gql)
            //             .send({
            //                 query:
            //                     'mutation {insertCat(newCat: { name: "Vanitas", breed: "Calico", age: 100 }) {breed name id age}}',
            //             })
            //             .expect(200)
            //             .expect((res) => {
            //                 expect(res.body.data.insertCat).toEqual({
            //                     name: 'Vanitas',
            //                     breed: 'Calico',
            //                     age: 100,
            //                     id: '4',
            //                 });
            //             })
            //             // chain another request to see our original one works as expected
            //             .then(() =>
            //                 request(app.getHttpServer())
            //                     .post(gql)
            //                     .send({ query: '{getCats {id name breed age}}' })
            //                     .expect(200)
            //                     .expect((res) => {
            //                         expect(res.body.data.getCats).toEqual(
            //                             cats.concat([
            //                                 {
            //                                     name: 'Vanitas',
            //                                     breed: 'Calico',
            //                                     age: 100,
            //                                     id: '4',
            //                                 },
            //                             ]),
            //                         );
            //                     }),
            //             )
            //     );
            // });
        });
    });
});