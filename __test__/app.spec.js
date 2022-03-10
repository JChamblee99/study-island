const request = require('supertest')
const app = require('../src/app.js');

describe("Testing home endpoint", () => {
    it("Should return 'Hello World!'", async () => {
        
        const response = await request(app).get('/');

        expect(response.status).toBe(200);
        expect(response.body).toBe('Hello World!');

    });
});
