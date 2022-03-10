const User = require('../models/user.model');

const testUserData = {
    userId: 1,
    firstName: 'John',
    lastName: 'Doe',
    username: 'johnDoe',
    email: 'john@email.com',
    password: 'password',
    role: 'user'};

const { dbConnect,dbDisconnect } = require('../../utils/test-utils/dbHandler.utils');

beforeAll(async () => dbConnect());
afterAll(async () => dbDisconnect());

describe('User Model Test Suite', () => {

    it('create and save user to database', async () => {
    
        const validUser = new User(testUserData);
        const savedUser = await validUser.save();

        expect(savedUser).not.toBeNull();
        expect(savedUser.userId).toBe(testUserData.userId);
        expect(savedUser.firstName).toBe(testUserData.firstName);
        expect(savedUser.lastName).toBe(testUserData.lastName);
        expect(savedUser.username).toBe(testUserData.username);
        expect(savedUser.email).toBe(testUserData.email);
        expect(savedUser.password).toBe(testUserData.password);
        expect(savedUser.role).toBe(testUserData.role);
    
    });

});