const Island = require('../island');
const request = require('supertest')
const express = require('express')
const app = express();

const { dbConnect, dbDisconnect } = require('../../../utils/test-utils/dbHandler.utils');

const Sample = require('../../database/sample.js');

app.use(express.urlencoded({ extended: false}));
app.use("/islands", Island);

beforeAll(async () => dbConnect());

afterAll(async () => dbDisconnect());

describe('Island route test suite', () => {

    it('Gets all islands', async (done) => {

        Sample.build();

        const response = await request(app)
            .get('/islands');
            
        expect(response.status).toBe(200);
        expect(response.json).toEqual(Sample.Island);
        end(done);
        
    });

});