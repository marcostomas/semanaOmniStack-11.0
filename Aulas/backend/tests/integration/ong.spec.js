const request = require('supertest')
const app = require('../../src/app')
const connection = require('../../src/database/connection')

describe('ONG', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    });

    it('should be able to create a new ONG', async() => {
        const response = await request(app)
        .post('/ongs')
        /*

        A seguinte linha coloca uma autorização, como se fosse os headers no Postman e é usada apenas para as
        requisições que necessitem de algum header

        //.set('Authorization', 'c4edb8cd')
        */
        .send({
            name : "ONG Teste 2",
            email : "ongteste@email.com",
            whatsapp : "4712345600",
            city : "Rio do Sul",
            uf : "SC"
        });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
});