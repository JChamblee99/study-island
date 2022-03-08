const User = require('../models/user.model');
const { testUserData } = require('../fixtures/user');
const {
    validateNotEmpty,
    validateStringEquality,
    validateMongoDuplicationError,
} = require('../../utils/test-utils/validators.utils');
const {
    dbConnect,
    dbDisconnect,
} = require('../../utils/test-utils/dbHandler.utils');

beforeAll(async () => dbConnect());
afterAll(async () => dbDisconnect());

describe('User Model Test Suite', () => {
    test('should validate saving a new user successfully', async () => {
        const validUser = new User({
        local: testUserData,
        role: testUserData.role,
    });
    const savedUser = await validUser.save();

    validateNotEmpty(savedUser);

    validateStringEquality(savedUser.role, testUserData.role);
    validateStringEquality(savedUser.local.email, testUserData.email);
    validateStringEquality(savedUser.local.username, testUserData.username);
    validateStringEquality(savedUser.local.password, testUserData.password);
    validateStringEquality(savedUser.local.firstName, testUserData.firstName);
    validateStringEquality(savedUser.local.lastname, testUserData.lastname);
});

    test('should validate MongoError duplicate error with code 11000', async () => {
        expect.assertions(4);
        const validUser = new User({
            local: testUserData,
            role: testUserData.role,
        });

        try {
            await validUser.save();
        } catch (error) {
            const { name, code } = error;
            validateMongoDuplicationError(name, code);
        }
    });
});