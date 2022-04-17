const Islands = require('../islands');
const request = require('supertest')
const express = require('express')
const app = express();

const { dbConnect, dbDisconnect } = require('../../../utils/test-utils/dbHandler.utils');

const Sample = require('../../database/sample.js');

app.use(express.urlencoded({ extended: false }));
app.use("/islands", Islands);

beforeAll(async () => dbConnect());

afterAll(async () => dbDisconnect());


describe('Island route testing suite', () => {
    it('should return a 200 if the homepage is reached', done => {

      expect(1).toBe(1);
      console.log("Need to add island route tests");
    });
});

