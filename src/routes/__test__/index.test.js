const Index = require('../index');
const request = require('supertest')
const express = require('express')
const app = express();

app.use('/', Index);

describe('get homepage', () => {
    it('should return a 200 if the homepage is reached', done => {

      
    });
});